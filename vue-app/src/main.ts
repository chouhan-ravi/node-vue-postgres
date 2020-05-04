import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import VueSocketIO from 'vue-socket.io';
import SocketIO from "socket.io-client";
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
const authKey = (process.env.BASIC_AUTH_KEY || "dGVzdDp0ZXN0");
const baseUrl = (process.env.API_URL || "http://localhost:3000");
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(baseUrl+"?token="+authKey,{
    // path: '',
    // transportOptions: {
    //   polling: {
    //     extraHeaders: {
    //       Authorization: "Basic dGVzdDp0ZXN0", //test:test
    //       Origin: "http://localhost:8081"
    //     }
    //   }
    // }
  }),
  vuex: {
    store,
    actionPrefix: 'SOCKET_'
  }
}));

Vue.use(Toasted);

// Lets Register a Global Toasts.
Vue.toasted.register('appError',
  (payload) => {
    if (!payload.message) {
      return "Message not definded."
    }
    return payload.message;
  },
  {
    type: 'error'
  });

Vue.toasted.register('appSuccess',
  (payload) => {
    if (!payload.message) {
      return "Message not definded."
    }
    return payload.message;
  }, {
  type: 'success'
});

Vue.toasted.register('appInfo',
  (payload) => {
    if (!payload.message) {
      return "Message not definded."
    }
    return payload.message;
  }, {
  type: 'info'
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
