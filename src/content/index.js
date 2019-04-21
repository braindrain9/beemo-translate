import Vue from 'vue';
import Root from './Root.vue';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(ElementUI);

console.log('content-script is running!');

// create element which will be injected to the document
// and vue-app will be injected there
const popupDOM = document.createElement('div');

popupDOM.setAttribute('id', 'superContent');
document.body.appendChild(popupDOM);

/* eslint-disable no-new */
new Vue({
  el: '#superContent',
  render: h => h(Root)
});
