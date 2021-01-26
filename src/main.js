import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lazyLoad from 'vue-lazyload';
import fastClick from 'fastclick';
import '@/assets/style/css/index.styl';
Vue.config.productionTip = false;
Vue.use(lazyLoad, {
  loading: require('@/assets/image/loading.gif'),
});
fastClick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
