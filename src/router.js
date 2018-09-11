import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import First from './First'
const Second = () => import('./Second.vue')
const Third = () => import('./Third.vue')
const Fourth = () => import('./Fourth')
const Five = () => import('./Five')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: 'first',
    component: App,
    children: [
      {
        path: 'first',
        component: First
      }
    ]
  },
  {
    path: '/second',
    component: Second
  },
  ,
  {
    path: '/third',
    component: Third
  },
  {
    path: '/fourth',
    component: Fourth
  },
  {
    path: '/five',
    component: Five
  }
]

export default new Router({
  routes
})
