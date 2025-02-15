import {computed, createApp} from 'vue';
import App from './App.vue';
import i18n from './language';
import routes from './router';
import './assets/tailwind.css'
import './assets/main.css';
import { computePosition, offset, flip, shift } from "@floating-ui/vue";

const vTooltip = {
    beforeMount(el, binding) {
        const placement = Object.keys(binding.modifiers)[0] || "top";

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = binding.value;
        Object.assign(tooltip.style, {
            position: "absolute",
            backgroundColor: "black",
            color: "white",
            padding: "6px 10px",
            borderRadius: "5px",
            fontSize: "14px",
            whiteSpace: "nowrap",
            display: "none",
            zIndex: "1000",
            opacity: "0",
            transition: "opacity 0.3s ease-in-out, transform 0.2s ease-out",
            transform: "scale(0.95)",
        });

        document.body.appendChild(tooltip);

        el.addEventListener("mouseenter", () => {
            tooltip.style.display = "block";

            computePosition(el, tooltip, {
                placement: placement,
                middleware: [offset(8), flip(), shift({ padding: 5 })],
            }).then(({ x, y }) => {
                Object.assign(tooltip.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                    opacity: "1",
                    transform: "scale(1)",
                });
            });
        });

        el.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
            tooltip.style.transform = "scale(0.95)";
            setTimeout(() => {
                tooltip.style.display = "none";
            }, 200);
        });

        el._tooltip = tooltip;
    },
    unmounted(el) {
        document.body.removeChild(el._tooltip);
    },
};

const app = createApp(App);

app.use(i18n);
app.use(routes);
app.directive("tooltip", vTooltip);
app.config.globalProperties.$t = (key) => computed(() => i18n.global.t(key));
app.mount('#app');