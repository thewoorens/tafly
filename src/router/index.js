import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/cp/views/HomeView.vue';
import StatView from '@/cp/views/StatView.vue';
import ProductsView from '@/cp/views/ProductsView.vue';
import LoginView from '@/hello/Login.vue';
import RegisterView from '@/hello/RegisterView.vue';
import CustomerPanel from '@/cp/CustomerPanel.vue';
import CategoryView from "@/cp/views/CategoryView.vue";
import SurveyView from "@/cp/views/SurveyView.vue";
import BranchView from "@/cp/views/BranchView.vue";
import CustomizeView from "@/cp/views/tables/CustomizeView.vue";

const routes = [
    {
        path: '/cp',
        component: CustomerPanel,
        children: [
            {
                path: 'home',
                name: 'HomeView',
                components: {cp: HomeView},
            },
            {
                path: 'stats',
                name: 'StatsView',
                components: {cp: StatView},
            },
            {
                path: 'survey',
                name: 'SurveyView',
                components: {cp: SurveyView},
            },
            {
                path: 'products',
                name: 'ProductsView',
                components: {cp: ProductsView},
            },
            {
                path: 'category',
                name: 'CategoryView',
                components: {cp: CategoryView},
            },
            {
                path: 'branch',
                name: 'BranchView',
                components: {cp: BranchView},
            },
            {
                path: 'customize',
                name: 'CustomizeView',
                components: {cp: CustomizeView},
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
    {
        path: '/',
        redirect: '/login',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;