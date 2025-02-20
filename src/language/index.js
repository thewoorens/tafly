import { createI18n } from 'vue-i18n';

import en from './en.json';
import tr from './tr.json';
import de from './de.json';

const messages = {
    en,
    tr,
    de,
};

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('language') || 'tr',
    fallbackLocale: 'en',
    messages,
});

export default i18n;