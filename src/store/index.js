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
    },
    modules: {
        authentication
    }
});