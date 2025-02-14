import { createApp, computed } from 'vue';
import App from './App.vue';
import i18n from './language';
import routes from './router';
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const app = createApp(App);

app.use(i18n);
app.use(routes);

app.config.globalProperties.$t = (key) => computed(() => i18n.global.t(key));

app.mount('#app');

// Tippy.js başlat
tippy("[data-tippy-content]", {
    allowHTML: true,
    interactive: true,
    theme: "light",
    placement: "top",
    arrow: true,
});
