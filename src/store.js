import Vue from 'vue';
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);


export const store = new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    state: {
        user: {
            username: "",
            password: ""
        },
        role: "UNREGISTER"
    },
    getters: {
        username(state) {
            return state.user.username;
        },
        password(state) {
            return state.user.password;
        },
        user(state) {
            return state.user;
        },
        role(state) {
            return state.role;
        }
    },
    mutations: {
        setRole(state, role) {
            console.log(role);
            state.role = role;
        },
        login(state, user) {
            console.log(user);
            state.user.username = user.username;
            state.user.password = user.password;
        },
        logout(state) {
            state.user.username = " ";
            state.user.password = " ";
            state.role = "UNREGISTER";
        },
        changePassword(state, password) {
            state.user.password = password;
        }
    },
    actions: {
        loginAction(context, user) {
            context.commit("login", user);
        },
        setRoleAction(context, role) {
            context.commit("setRole", role);
        },
        changePassword(context, newPassword) {
            context.commit("changePassword", newPassword);

        }
    }
})