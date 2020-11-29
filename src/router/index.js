import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Postlist from '../views/Postlist.vue'
import Editpost from '../views/Editpost.vue'
import Test from '../views/test.vue'
import Index from '../views/index.vue'
import Index2 from '../views/index2.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      breadcrumb: '后台首页'
    },
    children: [
      {
        path: 'postlist',
        name: 'Postlist',
        component: Postlist,
        meta: {
          breadcrumb: '文章列表'
        }
      },
      {
        path: 'editpost',
        name: 'Editpost',
        component: Editpost,
        meta: {
          breadcrumb: '编辑文章'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/index2',
    name: 'index2',
    component: Index2
  }



]

const router = new VueRouter({
  routes
})

export default router
