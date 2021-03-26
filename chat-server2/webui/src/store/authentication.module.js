import { userService } from '../services/user.service';
import { router } from '../services/router';
const user = JSON.parse(localStorage.getItem('spacetugsuser'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        loginSuccess({ commit }, { username }) {
            commit('loginSuccess', { username });

        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        },
        signIn({ commit }, { profile, authResponse}){
            var re = /\S+@\S+\.\S+/;
            var username=""
            Object.keys(profile).forEach((key)=>{
                console.log(key)
                console.log(profile[key])
                console.log(re.test(profile[key]))
                if(re.test(profile[key].toLowerCase())){
                    username=profile[key]
                }
            })
            let user = {
                token: authResponse.id_token,
                username: username,
                signIn: 'Google'
            }
            fetch(this.state.datastore.backendUrl+"/v1/getUserScope?user="+username,{
                headers: new Headers({
                    'Authorization': 'Bearer '+authResponse.id_token, 
                    'signIn': 'Google'
                  }), 
            })
            .then((resp) =>{
                resp.json().then(function(data) {
                    console.log("user scope")
                    console.log(resp)
                    if (data){
                        user.id = data
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    commit('loginSuccess', user);
                    router.push('/');
                  });
                
            }).catch(() => {
                }); 
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: false };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}