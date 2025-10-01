import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import PortfoliosView from '@/views/portfolios-reporting/screens/PortfoliosView.vue'
import ReviewsView from '@/views/portfolios-reporting/screens/ReviewsView.vue'
import StocksView from '@/views/portfolios-reporting/screens/StocksView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProfilesView from '@/views/relations/screens/ProfilesView.vue'
import PortfoliosDetails from '@/views/portfolios-reporting/details/PortfoliosDetails.vue'
import StocksDetails from '@/views/portfolios-reporting/details/StocksDetails.vue'

import AdminView from '@/views/administration/AdminView.vue'
import UserSettings  from '@/views/user/screens/UserSettings.vue'

import { get as GetFromStore } from '@/localStorage'

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
      {
        path: '/portfolios/:id',
        name: 'portfolio-details',
        component: PortfoliosDetails,
        meta: {
          screen: 'portfolio-details'
        }
      },
      {
        path: '/stocks/:id',
        name: 'stock-details',
        component: StocksDetails,
        meta: {
          screen: 'stock-details'
        }
      },
      {
        path: 'administration',
        name: 'administration',
        component: AdminView,
        meta: {
          screen: 'administration'
        },
        beforeEnter: (to: any, from: any, next: any) => {
          const isAdmin = GetFromStore('logged.isAdmin');
          if (isAdmin) {
            next()
          }
        }

      },
      {
        path: "/user-settings",
        name: "user-settings",
        component: UserSettings,
        meta: { screen: "user-settings" },
      },
      {
        path: 'investors',
        name: 'investors',
        component: UserSettings,
        meta: {
          screen: 'investors'
        }

      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach( async(to, from) => {
  const isLogged = Boolean(GetFromStore('logged'));
  const requiresReset = GetFromStore('logged.requiresReset');

  if(!isLogged && to.name !== 'dashboard'){
    return {name: 'dashboard'}
  } else if( requiresReset && to.name !== 'user-settings') {
    return { name: 'user-settings'}
  }
})

export default router