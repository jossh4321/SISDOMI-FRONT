import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Usuarios from '../views/Users/GestionarUsuarios.vue'
import PlanIntervencion from '../views/PlanIntervencion/GestionarPlanIntervencion.vue'
import Talleres from '../views/Talleres/GestionarTalleres.vue'
import GestionarFichaIngreso from '../views/FichaIngreso/GestionarFichaIngreso.vue'
import Test from '../views/Users/Test.vue'
import Test1 from '../views/Users/TEST1.vue'
import GestionarInforme from '../views/Informe/GestionarInforme.vue'
import GestionarResidentes from '../views/Residentes/GestionarResidentes.vue'
<<<<<<< HEAD
import GestionarSeguimientoEducativo from '../views/SeguimientoEducativo/GestionarSeguimientoEducativo.vue'
=======
import GestionarSesionesEducativas from '../views/SesionesEducativas/GestionarSesionesEducativas.vue'
>>>>>>> e966dd01a07be8e39045af710715f98f3ec104b8


/* Rutas de sebas, fede, jaime y angello */
import GestionarPlanes from '@/views/PlanIntervencion/GestionarPlanes.vue';

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
        }, {
            path: 'test',
            name: 'Test',
            component: Test
        }, {
            path: 'test1',
            name: 'Test1',
            component: Test1
        }, {
            path: 'planIntervencion',
            name: 'GestionarPlanIntervencion',
            component: GestionarPlanes
        }, {
            path: 'talleres',
            name: 'GestionarTalleres',
            component: Talleres
        }, {
            path: 'fichaIngreso',
            name: 'GestionarFichaIngreso',
            component: GestionarFichaIngreso
        }, {
            path: 'informes',
            name: 'GestionarInforme',
            component: GestionarInforme
        }, {
            path: 'residentes',
            name: 'GestionarResidentes',
            component: GestionarResidentes
        }, {
<<<<<<< HEAD
            path: 'seguimientoEducativo',
            name: 'GestionarSeguimientoEducativo',
            component: GestionarSeguimientoEducativo
        },{
=======
            path: 'sesioneseducativas',
            name: 'GestionarSesionesEducativas',
            component: GestionarSesionesEducativas
        }, {
>>>>>>> e966dd01a07be8e39045af710715f98f3ec104b8
            path: 'planIntervencionR',
            name: 'plandeIntervencion',
            component: GestionarPlanes
        }],
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Layout/Principal.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login/Login.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router