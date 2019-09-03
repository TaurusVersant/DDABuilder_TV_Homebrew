import Vue from 'vue';
import Router from 'vue-router';
import DDA_Container from '@/components/DDA_Container';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DDA_Container',
      component: DDA_Container,
    }
  ]
})
