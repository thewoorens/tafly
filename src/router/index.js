import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/cp/views/HomeView.vue';
import StatView from '@/cp/views/StatView.vue';
import MessagesView from '@/cp/views/MessagesView.vue';
import ProductsView from '@/cp/views/ProductsView.vue';
import LoginView from '@/hello/Login.vue';
import RegisterView from '@/hello/RegisterView.vue';
import CustomerPanel from '@/cp/CustomerPanel.vue';

const routes = [
    {
        path: '/cp',
        component: CustomerPanel,
        children: [
            {
                path: 'home',
                name: 'HomeView',
                component: {cp: HomeView},
            },
            {
                path: 'stats',
                name: 'StatsView',
                components: {cp: StatView},
            },
            {
                path: 'messages',
                name: 'MessagesView',
                components: {cp: MessagesView},
            },
            {
                path: 'products',
                name: 'ProductsView',
                components: {cp: ProductsView},
            },
        ],
    },
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView,
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: RegisterView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;