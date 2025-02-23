const express = require('express');
const Business = require('../models/Business');
const User = require('../models/User');
const nodemailer = require("nodemailer");

const router = express.Router();

router.post('/create', async (req, res) => {
        try {
            console.log("🟩 Creating new Business");
            const {name, address, type, social, phone, email, logo, ownerId} = req.body;

            // Tüm alanların dolu olup olmadığını kontrol et
            if (!name || !address || !type || !phone || !email || !ownerId) {
                return res.status(400).json({message: "Tüm alanlar zorunludur."});
            }

            // Benzersiz alanları kontrol et
            const existingName = await Business.findOne({name});
            if (existingName) {
                return res.status(400).json({message: 100}); // Şirket adı zaten var
            }

            const existingPhone = await Business.findOne({phone});
            if (existingPhone) {
                return res.status(400).json({message: 101}); // Telefon numarası zaten var
            }

            const existingEmail = await Business.findOne({email});
            if (existingEmail) {
                return res.status(400).json({message: 102}); // E-posta zaten var
            }

            const newBusiness = new Business({name, address, type, social, phone, email, logo, ownerId});
            await newBusiness.save();

            await User.findByIdAndUpdate(ownerId, {$set: {setup: true}});

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
                subject: 'Tafly.co QR Menu Sistemine Hoş Geldiniz!',
                html: `<!DOCTYPE html>
                        <html lang="tr">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Başarıyla Oluşturulmuş Şirket</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    padding: 0;
                                    background-color: #f4f4f4;
                                }
                                .container {
                                    width: 100%;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                }
                                .header {
                                    text-align: center;
                                    padding: 20px 0;
                                }
                                .header img {
                                    max-width: 150px;
                                    margin-bottom: 15px;
                                }
                                .content {
                                    padding: 20px;
                                    text-align: center;
                                }
                                .content h2 {
                                    color: #333;
                                    font-size: 24px;
                                }
                                .content p {
                                    font-size: 16px;
                                    color: #555;
                                    line-height: 1.5;
                                }
                                .footer {
                                    text-align: center;
                                    padding: 20px 0;
                                    background-color: #f8f8f8;
                                    border-top: 1px solid #ddd;
                                }
                                .footer p {
                                    font-size: 14px;
                                    color: #777;
                                }
                                @media only screen and (max-width: 600px) {
                                    .container {
                                        padding: 10px;
                                    }
                                    .content h2 {
                                        font-size: 20px;
                                    }
                                    .content p {
                                        font-size: 14px;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <img src="https://i.hizliresim.com/8uegom0.jpg" alt="Şirket Logosu">
                                </div>
                                <div class="content">
                                    <h2>Şirketiniz Başarıyla Oluşturuldu!</h2>
                                    <p>Sayın <strong>${name}</strong>,</p>
                                    <p>Öncelikle, size ve işinizin yeni başlangıcına büyük bir heyecanla yaklaşırken, şirketinizin başarıyla oluşturulduğunu bildirmekten mutluluk duyuyoruz! Bu, sizin için önemli bir adım ve biz de bu yolculuğun bir parçası olabilmekten gerçekten gurur duyuyoruz.</p>
                                    <p>Artık <strong>${name}</strong> olarak, Hızlı Yapay Zeka destekli QR kod menülerini oluşturup yayınlayabileceksiniz. Bu menüler, işletmenizin dijital dönüşümüne büyük katkı sağlayacak ve müşterilerinize daha hızlı ve güvenli bir deneyim sunmanıza yardımcı olacak. Dilediğiniz gibi özelleştirebilir, hızlıca işletmenize entegre edebilirsiniz.</p>
                                    <p>Unutmayın, her zaman yanınızdayız! Herhangi bir sorunuz, öneriniz veya yardıma ihtiyacınız olursa, bizimle iletişime geçmekten çekinmeyin. İşletmenizi büyütme yolculuğunuzda her adımda sizinle olmaktan mutluluk duyacağız.</p>
                                    <p>Başarılarınızın devamını diler, her zaman en iyi hizmeti sunmanız için gereken desteği sağlamaktan gurur duyarız. Sizin için buradayız!</p>
                                    <p>Yolculuğunuzda en iyi dileklerimizle,<br>Kernel Software Ekibi</p>
                                </div>

                                <div class="footer">
                                    <p>&copy; 2025 Kernel Software. Tüm hakları saklıdır.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        `,
            };
            await transporter.sendMail(mailOptions);
            res.status(201).json({message: "Şirket başarıyla oluşturuldu."});
        } catch
            (err) {
            res.status(500).json({message: "Sunucu hatası", error: err.message});
            console.log("Failed to create new business: " + err.message);
        }
    }
)
;

router.get('/get', async (req, res) => {
    try {
        const {ownerId} = req.query;

        if (!ownerId) {
            return res.status(400).json({message: "ownerId zorunludur."});
        }

        const business = await Business.findOne({ownerId});

        if (!business) {
            return res.status(404).json({message: "Şirket bulunamadı."});
        }

        res.status(200).json({business});
    } catch (err) {
        res.status(500).json({message: "Sunucu hatası", error: err.message});
        console.log("Failed to fetch business: " + err.message);
    }
});



router.post('/settings/new', async function (req, res) {
    const {ownerId, settings} = req.body;
    if (!ownerId || !settings) {
        return res.status(400).json({message: "Kullanıcı kimliği ve ayarlar gereklidir."});
    }

    try {
        const business = await Business.findOneAndUpdate({ownerId: ownerId}, {settings}, {new: true});
        if (!business) {
            return res.status(404).json({message: "Kullanıcı bulunamadı."});
        }
        res.status(200).json({message: "Ayarlar güncellendi.", settings: business.settings});
    } catch (err) {
        res.status(500).json({message: "Sunucu hatası", error: err.message});
    }
});

router.get('/settings/read', async function (req, res) {
    const {ownerId} = req.query;
    if (!ownerId) {
        return res.status(400).json({message: "Kullanıcı kimliği gereklidir."});
    }

    try {
        const business = await Business.findOne({ownerId});
        if (!business) {
            return res.status(404).json({message: "Kullanıcı bulunamadı."});
        }
        res.status(200).json({settings: business.settings});
    } catch (err) {
        res.status(500).json({message: "Sunucu hatası", error: err.message});
    }
});


module.exports = router;
