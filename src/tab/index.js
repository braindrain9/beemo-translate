import Vue from 'vue';
import Root from './Root.vue';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(Root)
});
