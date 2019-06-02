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
        setRole(state,role)
        {
            state.role = role;
        },
        login(state, user) {
            state.user.username = user.username;
            state.user.password = user.password;
            state.user.isLoged = true;
        },
        logout(state) {
            state.user.username = " ";
            state.user.password = " ";
            state.role = "UNREGISTER";
        },
        changePassword(state,password) {
            state.user.password = password;
        }
    },
    actions: {
        login(context, user) {
            return DataAccess.login(user).then(data => {
                // eslint-disable-next-line no-console
                console.log(data);
                if (data != null) {
                    context.commit("login", user);
                    context.commit("setRole", data);
                    return data;
                }
            });
        },
        changePassword(context, newPassword) {
            context.commit("changePassword", newPassword);
              
        }
    }
})