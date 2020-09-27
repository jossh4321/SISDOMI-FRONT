import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        drawer: true
    },
    mutations: {
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },
        drawer(state, val) {
            state.drawer = val;
        }
    },
    actions: {},
    modules: {}
})