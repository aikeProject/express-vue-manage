import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Register from './views/Register'
import NotFound from './views/404'
import Login from './views/Login'
import Home from './views/Home'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                {path: '', component: Home},
                {path: 'home', component: Home},
                {path: 'foundlist', name: 'foundlist', component: Home},
                {path: 'infoshow', name: 'infoshow', component: Home},
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '*',
            name: '/404',
            component: NotFound,
        },
    ]
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//     const isLogin = localStorage.eleToken ? true : false;
//     if (to.path === '/login' || to.path === '/register') {
//         next();
//     } else {
//         isLogin ? next() : next('/login');
//     }
// });

export default router;