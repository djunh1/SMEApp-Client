import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfoliosView from '@/views/portfolios/screens/PortfoliosView.vue'
import ReviewsView from '@/views/portfolios/screens/ReviewsView.vue'
import StocksView from '@/views/portfolios/screens/StocksView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    redirect: '/portfolios/',

    children: [
      {
        path: '/portfolios',
        name: 'portfolios',
        component: PortfoliosView
      },
      {
        path: '/reviews',
        name: 'reviews',
        component: ReviewsView
      },
      {
        path: '/stocks',
        name: 'stocks',
        component: StocksView
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
