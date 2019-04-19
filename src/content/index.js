import Vue from 'vue';
import Root from './Root.vue';

Vue.config.productionTip = false;

// TODO delete than
console.log('content-script!');

const popupDOM = document.createElement('div');

popupDOM.setAttribute('id', 'superContent');
document.body.appendChild(popupDOM);

/* eslint-disable no-new */
new Vue({
  el: '#superContent',
  render: h => h(Root)
});
