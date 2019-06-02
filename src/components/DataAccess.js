import axios from "axios";
import { store } from "@/store.js"

var DataAccess = {
    adresIPPort: "localhost:8086",
    login(user) {
        return axios.get(
            "http://" + this.adresIPPort + "/myapp/Login",
            {
                params: null,
                auth: {
                    username: user.username,
                    password: user.password
                }
            }
        ).then(response => {
            return response.data;
        });
    },
    updatePassword(oldPassword, newPassword) {
        var user = {
            username: store.getters.username,
            password: newPassword
        };
        return axios.put(
            "http://" + this.adresIPPort + "/myapp/Uzytkownicy",
            user, {
                params: null,

                auth: {
                    username: store.getters.username,
                    password: oldPassword
                }
            }
        );
    },
    addUser(user) {
        return axios.post(
            "http://" + this.adresIPPort + "/myapp/Uzytkownicy", user
        ).then(response => {
            return response;
        });
    },
    getProblems() {
        return axios.get(
            "http://" + this.adresIPPort + "/myapp/Problems",
            {
                params: null,
                auth: {
                    username: store.getters.username,
                    password: store.getters.password 
                }
            }
        ).then(response => {
            return response;
        });
    },
    getProblemsForAdmin() {
        return axios.get(
            "http://" + this.adresIPPort + "/myapp/Problems/All",
            {
                params: null,
                auth: {
                    username: store.getters.username,
                    password: store.getters.password 
                }
            }
        ).then(response => {
            return response;
        });
    },
    //na razie przesyłanie jest bezpośrednio w komponencie FileUpload
    sendFile(file) {

        return axios.post(
            "http://" + this.adresIPPort + "/myapp/Pliki", file
        ).then(response => {
            return response;
        });
    },
}
export default DataAccess


