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
        );
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
    upProblem(id) {
        let ProblemInstanceId = {
            'id' : id
        }
        return axios.post(
            "http://" + this.adresIPPort + "/myapp/Queue/Up", ProblemInstanceId, {
                params: null,
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }
        );
    },
    downProblem(id) {
        let ProblemInstanceId = {
            'id' : id
        }
        return axios.post(
            "http://" + this.adresIPPort + "/myapp/Queue/Down", ProblemInstanceId, {
                params: null,
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }
        );
    },
    startProblem(id) {
        let ProblemInstanceId = {
            'id' : id
        }
        return axios.post(
            "http://" + this.adresIPPort + "/myapp/Queue/Start", ProblemInstanceId, {
                params: null,
                auth: {
                    username: store.getters.username,
                    password: store.getters.password
                }
            }
        );
    },
    stopProblem(id) {
        let ProblemInstanceId = {
            'id' : id
        }
        return axios.post(
            "http://" + this.adresIPPort + "/myapp/Queue/Stop", ProblemInstanceId ,{
                params: null,
                auth: {
                    username: store.getters.username,
                    password: store.getters.password
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


