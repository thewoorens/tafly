import { createApp } from 'vue';
import App from './App.vue';
import i18n from './language';
import routes from './router';
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

tippy("[data-tippy-content]", {
    allowHTML: true,
    interactive: true,
    theme: "light",
    placement: "top",
    arrow: true,
});
createApp(App)
    .use(i18n)
    .use(routes)
    .mount('#app');