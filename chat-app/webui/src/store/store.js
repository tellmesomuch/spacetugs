import Vue from 'vue'
//import Axios from 'axios' 
//import { authHeader } from '../services/auth.header';
export const datastore = {
    namespaced: true,
    state: {
        selectedRoom: "Main Room",
    },
    mutations: {
        SET_ROOM(state, room){
            state.selectedRoom = room
        },
        setLocalConfig(state, localConfig) {
            // For dev purpose
             state.backendUrl = localConfig.backendUrl
             state.tokenUrl = localConfig.tokenUrl
             state.backendWss = localConfig.backendWss
            // For production
           //  state.backendUrl = window.location.origin+'/sapi'
            // state.tokenUrl = window.location.origin+'/api/v1/token'
         }
    },
    actions: {
        fetchChartData({ commit }) {
            return new Promise((resolve) => {
                Vue.prototype.$http.get(this.state.datastore.backendUrl+"/v1/getChartList?filter=&quick=true")
                    .then((response) => {
                        commit("FETCH_CHARTS", response.data);
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        },
        fetchFullChartData({ commit }) {
            return new Promise((resolve) => {
                Vue.prototype.$http.get(this.state.datastore.backendUrl+"/v1/getChartList?filter=&quick=false")
                    .then((response) => {
                        commit("FETCH_FULL_CHARTS", response.data);
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        },
        fetchConfiguration({ commit }) {
            return new Promise((resolve) => {
                Vue.prototype.$http.get(this.state.datastore.backendUrl+"/v1/getConfig")
                    .then((response) => {
                        commit("FETCH_CONFIG", response.data);
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        },
        fetchProjects({ commit }) {
            return new Promise((resolve) => {
                Vue.prototype.$http.get(this.state.datastore.backendUrl+"/v1/getProjects")
                    .then((response) => {
                        commit("FETCH_PROJECTS", response.data);
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        },
        fetchAnnoucements({ commit }) {
            return new Promise((resolve) => {
                Vue.prototype.$http.get(this.state.datastore.backendUrl+"/v1/getAnnoucement")
                    .then((response) => {
                        commit("FETCH_ANNOUCEMENTS", response.data);
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        },
        fetchStarredArtifacts({ commit }) {
            return new Promise((resolve) => {
                Vue.prototype.$http.get(this.state.datastore.backendUrl+"/v1/getStarredArtifacts")
                    .then((response) => {
                        commit("FETCH_STA", response.data);
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        },
        fetchUserInfo({ commit }) {
            return new Promise((resolve) => {
                Vue.prototype.$http.get(this.state.datastore.backendUrl+"/v1/getUserInfo")
                    .then((response) => {
                        commit("FETCH_USERINFO", response.data);
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        }
    }
}

