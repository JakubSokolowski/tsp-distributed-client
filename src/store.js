import Vue from 'vue';
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import DataAccess from "@/components/DataAccess.js"

Vue.use(Vuex);


export const store = new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    state: {
        user: {
            username: "Mateusz",
            password: "Krol"
        },
        isLoged: false
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
        isLoged(state) {
            return state.isLoged;
        }
    },
    mutations: {
        setLoged(state,isLoged)
        {
            state.isLoged = isLoged;
        },
        login(state, user) {
            state.user.username = user.username;
            state.user.password = user.password;
            state.user.isLoged = true;
        },
        logout(state) {
            state.user.username = " ";
            state.user.password = " ";
            state.isLoged = false;
        },
        changePassword(state,password) {
            state.user.password = password;
        }
    },
    actions: {
        login(context, user) {
            return DataAccess.login(user).then(data => {
                console.log(data);
                if (data != null) {
                    context.commit("login", user);
                    context.commit("setLoged", data);
                    return data;
                }
            });
        },
        changePassword(context, newPassword) {
            context.commit("changePassword", newPassword);
              
        }
    }
})