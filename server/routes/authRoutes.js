const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();


router.get('/setup/:userId', async (req, res) => {
    try {
        const {userId} = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: "Kullanıcı bulunamadı."});
        }

        res.status(200).json({setup: user.setup});
    } catch (err) {
        res.status(500).json({message: "Sunucu hatası", error: err.message});
        console.log("Failed to fetch user setup status: " + err.message);
    }
});


router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Tüm alanlar zorunludur."});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "Bu e-posta zaten kullanılıyor."});
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000);
        const expiration = new Date(Date.now() + 3 * 60 * 1000); // 3 dakika sonrasının tarihi

        const newUser = new User({
            email,
            password: await bcrypt.hash(password, 10),
            verifyCode,
            codeExpires: expiration
        });
        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: 'Kernel Software <kernelsoftware0@gmail.com>',
            to: email,
            subject: 'Doğrulama Kodu',
            html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Doğrulama Kodu</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                .header img {
                    max-width: 150px;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .content h1 {
                    font-size: 24px;
                    color: #333333;
                }
                .content p {
                    font-size: 16px;
                    color: #555555;
                }
                .verify-code {
                    font-size: 32px;
                    font-weight: bold;
                    color: #007BFF;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #777777;
                    border-top: 1px solid #eeeeee;
                    margin-top: 20px;
                }
                .footer a {
                    color: #007BFF;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <img src="https://i.hizliresim.com/8uegom0.jpg" alt="Kernel Software Logo">
                </div>
                <div class="content">
                    <h1>Doğrulama Kodunuz</h1>
                    <p>Yeni doğrulama kodunuz aşağıda yer almaktadır:</p>
                    <div class="verify-code">${verifyCode}</div>
                    <p>Bu kodu kullanarak hesabınızı doğrulayabilirsiniz.</p>
                </div>
                <div class="footer">
                    <p>Bu e-posta <a href="https://tafly.co" target="_blank">tafly.co</a> tarafından desteklenmektedir.</p>
                    <p>&copy; 2025 Kernel Software. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </body>
        </html>
    `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({message: "Kullanıcı oluşturuldu. Lütfen e-postanızı doğrulayın."});
    } catch (error) {
        res.status(500).json({message: "Sunucu hatası", error: error.message});
    }
});


router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "E-posta ve şifre gereklidir."});
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Geçersiz e-posta veya şifre."});
        }

        if (!user.isVerified) {
            return res.status(400).json({message: "E-posta doğrulanmamış. Lütfen e-posta adresinizi doğrulayın."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Geçersiz e-posta veya şifre."});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            message: "Giriş başarılı",
            token,
            user: userData
        });
    } catch (error) {
        res.status(500).json({message: "Sunucu hatası", error: error.message});
    }
});


router.post('/verify', async (req, res) => {
    try {
        const {email, code} = req.body;
        if (!email || !code) {
            return res.status(400).json({message: "E-posta ve doğrulama kodu gereklidir."});
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Kullanıcı bulunamadı."});
        }

        if (user.codeExpires < Date.now()) {
            return res.status(400).json({message: "Doğrulama kodunun süresi dolmuş."});
        }

        if (user.verifyCode !== Number(code)) {
            return res.status(400).json({message: "Geçersiz doğrulama kodu."});
        }

        user.isVerified = true;
        user.verifyCode = null;
        user.codeExpires = null;
        user.resendCount = 0;
        await user.save();

        res.status(200).json({success: true, message: "E-posta doğrulaması başarılı."});
    } catch (error) {
        res.status(500).json({message: "Sunucu hatası", error: error.message});
    }
});


router.post('/resend-code', async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({message: "E-posta gereklidir."});
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Kullanıcı bulunamadı."});
        }

        // En fazla 3 defa gönderim yapılabilir
        if (user.resendCount >= 3) {
            return res.status(400).json({message: "Doğrulama kodunu en fazla 3 kez yeniden gönderebilirsiniz."});
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000);
        const expiration = new Date(Date.now() + 3 * 60 * 1000); // 3 dakika geçerli

        user.verifyCode = verifyCode;
        user.codeExpires = expiration;
        user.resendCount += 1;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: 'Kernel Software <kernelsoftware0@gmail.com>',
            to: email,
            subject: 'Doğrulama Kodu (Tekrar Gönderim)',
            html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Doğrulama Kodu</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                .header img {
                    max-width: 150px;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .content h1 {
                    font-size: 24px;
                    color: #333333;
                }
                .content p {
                    font-size: 16px;
                    color: #555555;
                }
                .verify-code {
                    font-size: 32px;
                    font-weight: bold;
                    color: #007BFF;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #777777;
                    border-top: 1px solid #eeeeee;
                    margin-top: 20px;
                }
                .footer a {
                    color: #007BFF;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <img src="https://i.hizliresim.com/8uegom0.jpg" alt="Kernel Software Logo">
                </div>
                <div class="content">
                    <h1>Doğrulama Kodunuz</h1>
                    <p>Yeni doğrulama kodunuz aşağıda yer almaktadır:</p>
                    <div class="verify-code">${verifyCode}</div>
                    <p>Bu kodu kullanarak hesabınızı doğrulayabilirsiniz.</p>
                </div>
                <div class="footer">
                    <p>Bu e-posta <a href="https://tafly.co" target="_blank">tafly.co</a> tarafından desteklenmektedir.</p>
                    <p>&copy; 2025 Kernel Software. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </body>
        </html>
    `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({message: "Doğrulama kodu yeniden gönderildi."});
    } catch (error) {
        res.status(500).json({message: "Sunucu hatası", error: error.message});
    }
});


module.exports = router;
