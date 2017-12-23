import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import ApiDocs from '@/components/ApiDocs'
import Callback from '@/components/Callback'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/editor',
      name: 'Editor',
      component: Editor,
      props: (route) => ({ script: route.query.script })
    }, {
      path: '/docs',
      name: 'ApiDocs',
      component: ApiDocs
    }, {
      path: '/callback',
      name: 'Callback',
      component: Callback
    }
  ]
})
