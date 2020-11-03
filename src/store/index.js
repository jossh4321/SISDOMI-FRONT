import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        drawer: true,
        usuarios: [],
        residentes: [],
        informes: []
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
        setInformes(state, value) {
            state.informes = value;
        }
    },
    actions: {},
    modules: {}
})