import { createRouter, createWebHistory } from 'vue-router';

import HomeView from "@/views/HomeView.vue";
import StatView from "@/views/StatView.vue";
import MessagesView from "@/views/MessagesView.vue";
import ProductsView from "@/views/ProductsView.vue";

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/stats',
        name: 'StatsView',
        component: StatView,
    },
    {
        path: '/messages',
        name: 'MessagesView',
        component: MessagesView,
    },
    {
        path: '/products',
        name: 'ProductsView',
        component: ProductsView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;