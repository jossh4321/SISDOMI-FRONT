// jshint esversion:6

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Usuarios from '../views/Users/GestionarUsuarios.vue';
import Talleres from '../views/Talleres/GestionarTalleres.vue';
import GestionarFichaIngreso from '../views/FichaIngreso/GestionarFichaIngreso.vue';
import Test from '../views/Users/Test.vue';
import Test1 from '../views/Users/TEST1.vue';
import GestionarInforme from '../views/Informe/GestionarInforme.vue';
import GestionarResidentes from '../views/Residentes/GestionarResidentes.vue';
import GestionarSeguimientoEducativo from '../views/SeguimientoEducativo/GestionarSeguimientoEducativo.vue';
import GestionarSesionesEducativas from '../views/SesionesEducativas/GestionarSesionesEducativas.vue';
import GestionarIncidencias from "../views/Incidencias/GestionarIncidencias.vue";
import GestionarAnexos from '../views/Anexos/GestionarAnexos.vue';
import GestionActa from '../views/Acta/GestionarActa.vue';
import ModificarPerfil from '../views/perfil/ModificarPerfil.vue';
import GestionarFichaEvaluacionEducativa from '../views/FichaEvaluacionEducativa/GestionarFichaEvaluacionEducativa.vue';
import GestionarEvaluacionEducativa from '../views/Evaluacion/GestionarEvaluacion.vue';
import GestionResidentes from '../views/Residentes/GestionResidentes.vue';
import ProgresoEducativoResidente from '../views/Residentes/ProgresoEducativoResidente.vue';
import GestionarActividades from '../views/Actividades/GestionarActividades.vue';

//Prueba
import PruebaActa from '../views/Acta/PruebaActa.vue';

//Cambiar Contrasena
import CambiarContrasena from '../views/CambiarContrasena/Cambiarcontrasena.vue';

/* Rutas de sebas, fede, jaime y angello */
import GestionarPlanes from '@/views/PlanIntervencion/GestionarPlanes.vue';

/* Rutas para la consulta de expediente */
import GestionarExpedientes from '@/views/ExpedienteMatriz/GestionarExpedientes.vue';
import ExpedienteResidente from '@/views/ExpedienteMatriz/ExpedienteResidente.vue';
import ProgresoResidente from '@/views/Home/Progreso.vue'
import ProgresoF2Residente from '@/views/Home/ProgresoFase2.vue'
import ProgresoF1Residente from '@/views/Home/ProgresoFase1.vue'
import ProgresoF3Residente from '@/views/Home/ProgresoFase3.vue'
/* Importación del axios para la verificación del token */
import axios from '../store/index.js';


import ConsultaEstadisticas from '@/views/Estadisticas/ConsultaEstadisticas.vue';
import Tratamiento from '@/views/Home/Tratamiento.vue';
import Documentos from '@/views/Home/Documentos.vue';
import Fase1 from '@/views/Home/Fase1.vue';
import Fase2 from '@/views/Home/Fase2.vue';
import Fase3 from '@/views/Home/Fase3.vue';
import Fase4 from '@/views/Home/Fase4.vue';
import DocumentoGeneral from '@/views/Home/DocumentoGeneral.vue';
import DocumentoSocial from '@/views/Home/DocumentoSocial.vue';
import DocumentoPsicologico from '@/views/Home/DocumentoPsicologico.vue';
import DocumentoEducativo from '@/views/Home/DocumentoEducativo.vue';
import DashBoard from '@/views/Dashboard'


Vue.use(VueRouter);

const routes = [{
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        path: '/dashboard',
        name: 'Dashboard',
        children: [{
                path: 'home',
                name: 'Home',
                component: Home,
            }, {
                path: 'home/residentes',
                name: 'GestionResidentes',
                component: GestionResidentes
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
                path: 'seguimientoEducativo',
                name: 'GestionarSeguimientoEducativo',
                component: GestionarSeguimientoEducativo
            }, {
                path: 'sesioneseducativas',
                name: 'GestionarSesionesEducativas',
                component: GestionarSesionesEducativas
            },
            {
                path: 'planIntervencionR',
                name: 'plandeIntervencion',
                component: GestionarPlanes
            }, {
                path: 'incidencias',
                name: 'GestionarIncidencias',
                component: GestionarIncidencias
            },
            {
                path: 'anexos',
                name: 'anexos',
                component: GestionarAnexos
            },
            {
                path: 'actas',
                name: 'GestionarActa',
                component: GestionActa
            },
            {
                path: 'expedientes',
                name: 'ConsultaExpedienteMatriz',
                component: GestionarExpedientes
            },
            {
                path: 'expediente/:idresidente',
                name: 'ExpedienteResidente',
                component: ExpedienteResidente,
                props: true
            },
            {
                path: 'progresoEducativo/:idresidente',
                name: 'ProgresoEducativoResidente',
                component: ProgresoEducativoResidente,
                props: true
            },
            {
                path: 'p',
                name: 'PruebaActa',
                component: PruebaActa
            },
            {
                path: 'modificarPerfil',
                name: 'Perfil',
                component: ModificarPerfil
            },
            {
                path: 'evaluacionEducativa',
                name: 'GestionarFichaEvaluacionEducativa',
                component: GestionarEvaluacionEducativa
            },
            {
                path: 'estadisticas',
                name: 'ConsultaEstadisticas',
                component: ConsultaEstadisticas

            },
            {
                path: 'tratamiento',
                name: 'Tratamiento',
                component: Tratamiento
            },
            {
                path: 'documentos',
                name: 'Documentos',
                component: Documentos
            },
            {
                path: 'fase1',
                name: 'Fase1',
                component: Fase1
            },
            {
                path: 'fase2',
                name: 'Fase2',
                component: Fase2
            },
            {
                path: 'fase3',
                name: 'Fase3',
                component: Fase3
            },
            {
                path: 'fase4',
                name: 'Fase4',
                component: Fase4
            },
            {
                path: 'documentogeneral',
                name: 'DocumentoGeneral',
                component: DocumentoGeneral
            },
            {
                path: 'documentopsicologico',
                name: 'DocumentoPsicologico',
                component: DocumentoPsicologico
            },
            {
                path: 'documentoeducativo',
                name: 'DocumentoEducativo',
                component: DocumentoEducativo
            },
            {
                path: 'documentosocial',
                name: 'Documentosocial',
                component: DocumentoSocial
            },
            {
                path: 'CambiarContrasena',
                name: 'cambiarContrasena',
                component: CambiarContrasena
            },
            {
                path: 'ProgresoResidente/:id',
                name: 'ProgresoResidente',
                component: ProgresoResidente,
                params: true
            },
            {
                path: 'ProgresoF2Residente/:id',
                name: 'ProgresoF2Residente',
                component: ProgresoF2Residente,
                params: true
            }, {
                path: 'ProgresoF1Residente/:id',
                name: 'ProgresoF1Residente',
                component: ProgresoF1Residente,
                params: true
            },
            {
                path: 'ProgresoF3Residente/:id',
                name: 'ProgresoF3Residente',
                component: ProgresoF3Residente,
                params: true
            },{
                path: 'Dashboard',
                name: 'Dashboard',
                component: DashBoard,
                params: true
            },
            {
                path: 'gestionaractividades',
                name: 'GestionarActividades',
                component: GestionarActividades,
                params: true
            },
        ],

        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Layout/Principal.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login/Login.vue')
    },
    {
        path: '',
        redirect: '/dashboard'
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {

    if (to.path == "/login") {

        if (axios.state.idToken || localStorage.getItem("token")) {
            return next("/dashboard");
        }
        return next();

    } else if (axios.state.idToken || localStorage.getItem("token")) {
        return next();
    } else {
        return next("/login");
    }

});

export default router;