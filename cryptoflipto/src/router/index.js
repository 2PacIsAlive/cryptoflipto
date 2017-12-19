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
      component: Editor,
      props: (route) => ({ script: route.query.script })
    }, {
      path: '/docs',
      name: 'ApiDocs',
      component: ApiDocs
    }
  ]
})
