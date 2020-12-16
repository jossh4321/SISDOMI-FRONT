// jshint esversion:6

//Para el uso del axios en las acciones
import axios from 'axios';

//Para el uso de rutas en las acciones
import router from '../../router/index.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const state = {
    idToken: null,
    user: null,
    loadingSession: false
};

const getters = {
    // Para la obtención de datos del usuario y el loading de carga
    user: (state) => {
        return state.user;
    },
    loading: (state) => {
        return state.loadingSession;
    }
};

const mutations = {
    //SESIÓN QUE SE CONVERTIRÁ EN UN MÓDULO
    setAuthUser: (state, userData) => {
        state.idToken = userData.idToken;
    },
    clearAuthData: (state) => {
        state.idToken = null;
    },
    setUser: (state, user) => {
        state.user = user;
    },
    setLoading: (state, value) => {
        state.loadingSession = value;
    }
};

const actions = {
    setLogoutTimer: ({
        dispatch
    }, expirationDateTime) => {

        setTimeout(() => {

            dispatch('logOut');

        }, expirationDateTime);
    },
    logIn: ({
        commit,
        dispatch
    }, userData) => {

        commit('setLoading', true);

        axios.post('/Account/login', userData)
            .then(res => {

                commit('setLoading', false);

                /* Para obtener la cantidad total de milisegundos en la cual se va usar para el deslogue automático */
                const DateNow = new Date();

                let DateExpiration = new Date(res.data.expiration);

                const expirationTime = (DateExpiration - DateNow);

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('expirationDate', DateExpiration);

                commit('setAuthUser', {
                    idToken: res.data.token
                });

                dispatch('setLogoutTimer', expirationTime);

                router.replace('/dashboard');
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales Incorrectas',
                    text: 'Verificar los campos ingresados'
                  })
                  commit('setLoading', false);
            });
    },
    tryAutoLogin: ({
        commit,
        dispatch
    }) => {

        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        const expirationDate = localStorage.getItem('expirationDate');
        const DateNow = new Date();

        if (DateNow >= expirationDate) {
            return;
        }

        commit('setAuthUser', {
            idToken: token
        });

        const expirationTime = new Date(expirationDate) - DateNow;

        dispatch('setLogoutTimer', expirationTime);
    },
    logOut: ({
        commit
    }) => {

        commit('clearAuthData');

        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');

        router.replace('/login');

    },
    fetchUser: ({
        commit
    }) => {

        axios.get('/Account/user')
            .then(res => {
                commit('setUser', res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};