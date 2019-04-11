import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import cloudApp from '@/cloudApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cloudApp',
      component: cloudApp
    }
  ]
})
