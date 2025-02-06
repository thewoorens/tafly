import {createRouter, createWebHistory} from 'vue-router';
import HomeView from "@/views/HomeView.vue";
import StatView from "@/views/StatView.vue";
import MessagesView from "@/views/MessagesView.vue";
import ProductsView from "@/views/ProductsView.vue";
import LoginView from "@/views/Login.vue";
import RegisterView from "@/views/RegisterView.vue";

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


router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;