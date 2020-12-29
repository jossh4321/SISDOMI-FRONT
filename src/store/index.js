// jshint esversion:8

import Vue from 'vue';
import Vuex from 'vuex';

//Para el uso del axios en las acciones
import axios from 'axios';

//Para el uso de rutas en las acciones
import router from '../router/index.js';

/* Uso del módulo de autenticación */
import authentication from '@/store/modules/authentication.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: true,
        usuarios: [],
        residentes: [],
        informes: [],
        fichaingreso: [],
        seguimientoEducativo: [],
        sesionesEducativas: [],
        incidencias:[],
        fichaEvaluacionEduativa:[],
        talleres:[],
        nombreCar:'DOMI',
        fase:""
    },
    getters :{
        nombreCar: (state) => {
            return state.nombreCar;
        }
    },
    mutations: {
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },
        drawer(state, val) {
            state.drawer = val;
        },
        setUsuarios(state, value) {
            state.usuarios = value;
        },
        addUsuario(state, value) {
            state.usuarios.push(value);
        },
        replaceUsuario(state, value) {
            var index = state.usuarios.findIndex(x => x.id == value.id);
            state.usuarios.splice(index, 1, value);
        },
        //////RESIDENTES
        setResidentes(state, value) {
            state.residentes = value;
        },
        addResidente(state, value) {
            state.residentes.push(value);
        },
        ///SESIONES EDUCATIVAS
        setSesionesEducativas(state, value) {
            state.sesionesEducativas = value;
        },
        addSesionesEducativas(state, value) {
            state.sesionesEducativas.push(value);
        },
        replaceSesionesEducativas(state, value) {
            var index = state.sesionesEducativas.findIndex(x => x.id == value.id);
            state.sesionesEducativas.splice(index, 1, value);
        },
        ///INFORMES
        setInformes(state, value) {
            state.informes = value;
        },
        addInforme(state, value) {
            state.informes.push(value);
        },
        replaceInforme(state, value) {
            var index = state.informes.findIndex(x => x.id == value.id);
            state.informes.splice(index, 1, value);
        },
        ///FICHAINGRESOS
        setFichaIngreso(state, value) {
            state.fichaingreso = value;
        },
        addFichaIngreso(state, value) {
            state.fichaingreso.push(value);
        },
        replaceFichaIngreso(state, value) {
            var index = state.fichaingreso.findIndex(x => x.id == value.id);
            state.fichaingreso.splice(index, 1, value);
        },
        replaceResidente(state, value) {
            var index = state.residentes.findIndex(x => x.id == value.id);
            state.residentes.splice(index, 1, value);
        },
        //SEGUIMIENTO EDUCATIVO
        setSeguimiento(state, value) {
            state.seguimientoEducativo = value;
        },
        addSeguimiento(state, value) {
            state.seguimientoEducativo.push(value);
        },
        replaceSeguimiento(state, value) {
            var index = state.seguimientoEducativo.findIndex(x => x.id == value.id);
            state.seguimientoEducativo.splice(index, 1, value);
        },
        //INCIDENCIAS
        setIncidencias(state,value){
            state.incidencias = value;
        },addIncidencia(state,value){
            state.incidencias.push(value);
        },replaceIncidencia(state, value) {
            var index = state.incidencias.findIndex(x => x.id == value.id);
            state.incidencias.splice(index, 1, value);
        },
        // Ficha Evaluacion Diagnostico Eductiva
        setEvaluacion(state,value){
            state.fichaEvaluacionEduativa=value;
        },addEvaluacion(state,value){
        state.fichaEvaluacionEduativa.push(value);
        },replaceEvaluacion(state, value) {
        var index = state.fichaEvaluacionEduativa.findIndex(x => x.id == value.id);
         state.fichaEvaluacionEduativa.splice(index, 1, value);
        },
        // talleres
        setTalleres(state, value) {
            state.talleres = value;
        },
        addTaller(state, value) {
            state.talleres.push(value);
        },
        replaceTaller(state, value) {
            var index = state.talleres.findIndex(x => x.id == value.id);
            state.talleres.splice(index, 1, value);
        },setNombreCar(state, value){
            state.nombreCar = value;
        },setFase(state,value){
            state.fase = value;
        }
    },
    modules: {
        authentication
    }
});