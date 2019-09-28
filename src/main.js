// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import DDA_Boxes from './components/dda_components/DDA_Boxes';
import DDA_Checkbox from './components/dda_components/DDA_Checkbox';
import DDA_Input from './components/dda_components/DDA_Input';
import DDA_Span from './components/dda_components/DDA_Span';
import DDA_TextArea from './components/dda_components/DDA_TextArea';

Vue.component('dda_box', DDA_Boxes);
Vue.component('dda_checkbox', DDA_Checkbox);
Vue.component('dda_input', DDA_Input);
Vue.component('dda_span', DDA_Span);
Vue.component('dda_textarea', DDA_TextArea);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
