import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Usuarios from '../views/Users/GestionarUsuarios.vue'
import Test from '../views/Users/Test.vue'
Vue.use(VueRouter)

const routes = [{
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        path: '/dashboard',
        name: 'Dashboard',
        children: [{
            path: 'home',
            name: 'Home',
            component: Home
        }, {
            path: 'usuarios',
            name: 'GestionarUsuarios',
            component: Usuarios
        }, , {
            path: 'test',
            name: 'Test',
            component: Test
        }],
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Layout/Principal.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router