import { createStore } from 'vuex'
import state from './state'
import { GlobalState } from './types'
import portfolioManagement from './modules/portfolioManagement';

const store = createStore({
  state,
  modules: {
    portfolioManagement: portfolioManagement
  }
})

export default store;