// src/i18n/index.js
import { createI18n } from 'vue-i18n';

// Dil dosyalarını import edin
import en from './en.json';
import tr from './tr.json';

// Dil mesajlarını tanımlayın
const messages = {
    en,
    tr,
};

// i18n örneğini oluşturun
const i18n = createI18n({
    locale: 'tr', // Varsayılan dil
    fallbackLocale: 'en', // Fallback dil
    messages, // Dil mesajları
});

export default i18n;