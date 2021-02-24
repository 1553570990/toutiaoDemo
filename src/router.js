import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'*',
            component:()=>import('./views/404.vue')
        },
        {
        path: '/',
        component: () => import('./views/login_register')
    }, {
        path: '/login',
        redirect: '/'
    }, {
        path: '/register',
        redirect: '/'
    }, {
        path: '/home',
        component: () => import('./views/home'),
        children: [{
            path: '',
            component: () => import('./views/home/main.vue')
        }, {
            path:'account',
            component:()=>import('./views/account')
        },{
            path:'comment',
            component:()=>import('./views/comment')
        },{
            path:'material',
            component:()=>import('./views/material')
        }]
    }]
})