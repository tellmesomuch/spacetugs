import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex);
 
export const socketstore ={
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    },
    messages: [],
    notifications: [],
    message: {},
    rooms: []
  },
  mutations:{
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      state.messages = event.messages 
    },
    SOCKET_ONCLOSE (state)  {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      state.socket.message = message
      if (!state.messages){
        state.messages = []
      }
      state.messages.push(message)
    },
     // default handler called for all methods
     NOTIFICATION (state, message)  {
      state.socket.rooms = message
      if(!state.rooms){
        state.rooms=[]
      }
      console.log(message)
      state.rooms.push(message.Room)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    INITROOMS(state, rooms){
      state.rooms = rooms;
    },
    INITMESSAGES(state, messages){
      state.messages = messages;
    }
  },
  actions: {
    sendMessage (context, message) {
      Vue.prototype.$socket.send(message)
    },
    initRooms({ commit }){
      return new Promise((resolve) => {
        Vue.prototype.$http.get(this.state.datastore.backendUrl+"/rooms")
            .then((response) => {
                commit("INITROOMS", response.data);
                resolve();
            })
            .catch(() => {
            });
    });
    },
    loadMessages ({ commit }, { messages }){
      commit("INITMESSAGES", messages);
    }
  }
}