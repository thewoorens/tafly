import { createApp } from 'vue';
import App from './App.vue';
import i18n from './language';
import routes from './router';

createApp(App)
    .use(i18n)
    .use(routes)
    .mount('#app');