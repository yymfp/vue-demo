import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('../views/Login.vue');
const Index = () => import('@/views/index.vue');
const Detail = () => import('@/views/Detail.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }, {
        path: '/Index',
        name: 'Index',
        component: Index,
    }, {
        path: '/Detail',
        name: 'Detail',
        component: Detail,
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
