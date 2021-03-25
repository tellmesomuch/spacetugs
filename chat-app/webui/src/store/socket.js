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
    message: {}
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
      console.log(message)
      if (!state.messages){
        state.messages = []
      }
      console.log(state.messages)
      state.messages.push(message)
    },
     // default handler called for all methods
     NOTIFICATION (state, message)  {
      state.socket.notifications = message
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  actions: {
    sendMessage (context, message) {
      Vue.prototype.$socket.send(message)
    },
    loadMessages ({ commit }, { messages }){
      console.log(messages)
      commit("SOCKET_ONMESSAGE", messages);
    }
  }
}