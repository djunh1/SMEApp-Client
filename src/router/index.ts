import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import PortfoliosView from '@/views/portfolios-reporting/screens/PortfoliosView.vue'
import ReviewsView from '@/views/portfolios-reporting/screens/ReviewsView.vue'
import StocksView from '@/views/portfolios-reporting/screens/StocksView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProfilesView from '@/views/relations/screens/ProfilesView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,

    children: [
      {
        path: '/portfolios',
        name: 'portfolios',
        component: PortfoliosView,
        meta: { screen: 'portfolios' }
      },
      {
        path: '/reviews',
        name: 'reviews',
        component: ReviewsView,
        meta: { screen: 'reviews' }
      },
      {
        path: '/stocks',
        name: 'stocks',
        component: StocksView,
        meta: { screen: 'stocks' }
      },
      { // TODO-2 add user profiles
        path: '/profiles',
        name: 'profiles',
        component: ProfilesView,
        meta: { screen: 'profiles' }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
