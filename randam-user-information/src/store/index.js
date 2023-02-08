import { createStore } from 'vuex'

export default createStore( {
    state: {
        users: [],
        username: null,
        auth: false
    },
    getters:{

    },
    actions: {
        async setUsers({commit}) {
            const users = window.localStorage.getItem('users')
            if ( users ) 
                commit('setUsers', JSON.parse(users) )
            else {
                try {
                  await fetch("https://randomuser.me/api/?results=100")
                    .then(data => data.json())
                    .then(data => {
                        commit('setUsers', data.results )
                        window.localStorage.setItem('users', JSON.stringify(data.results))
                    });
                } catch (error) {
                  console.error(error);
                }
            }
        },
        doLogin( {commit}, username){
            commit("doLogin", username)
        },
        doLogout({commit}){
            commit("doLogout")
        }
    },
    mutations: {
        setUsers( state, users ) {
            state.users = users
        },
        // Debemos autenticar a los usuarios con un servicio
        doLogin( state, username ){
            state.auth = true;
            state.username = username
        },
        doLogout( state ){
            state.auth = false;
            state.username = null
        },
    },
    modules: {

    }


})