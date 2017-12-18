import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import ApiDocs from '@/components/ApiDocs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: Editor
    }, {
      path: '/apiDocs',
      name: 'ApiDocs',
      component: ApiDocs
    }
  ]
})
