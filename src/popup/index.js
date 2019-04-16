import Vue from 'vue';
import Root from './Root.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Font awesome
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
Vue.component('icon', Icon);

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(Root)
});
