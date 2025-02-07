// import Vue from 'vue'
// import Router from 'vue-router'
// import LandingPage from '@/components/LandingPage'
// import NewPage from '@/components/NewPage' // 새로운 페이지 추가

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'landing-page',
//       component: LandingPage
//     },
//     {
//       path: '/new-page',
//       name: 'new-page',
//       component: NewPage
//     },
//     {
//       path: '*',
//       redirect: '/'
//     }
//   ]
// })




import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('../components/LandingPage2').default
    },
    {
      path: '/another-page',
      name: 'AnotherPage',
      component: require('../components/AnotherPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
