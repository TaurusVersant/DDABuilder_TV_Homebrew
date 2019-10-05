// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import DDA_Boxes from './components/dda_components/DDA_Boxes';
import DDA_Checkbox from './components/dda_components/DDA_Checkbox';
import DDA_Effects from './components/dda_components/DDA_Effects';
import DDA_Input from './components/dda_components/DDA_Input';
import DDA_Modal from './components/dda_components/DDA_Modal';
import DDA_Select from './components/dda_components/DDA_Select';
import DDA_Span from './components/dda_components/DDA_Span';
import DDA_Stat from './components/dda_components/DDA_Stat';
import DDA_TextArea from './components/dda_components/DDA_TextArea';
import DDA_WoundBox from './components/dda_components/DDA_WoundBox';

Vue.component('dda_box', DDA_Boxes);
Vue.component('dda_checkbox', DDA_Checkbox);
Vue.component('dda_effects', DDA_Effects);
Vue.component('dda_input', DDA_Input);
Vue.component('dda_modal', DDA_Modal);
Vue.component('dda_select', DDA_Select);
Vue.component('dda_span', DDA_Span);
Vue.component('dda_stat', DDA_Stat);
Vue.component('dda_textarea', DDA_TextArea);
Vue.component('dda_woundbox', DDA_WoundBox);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
