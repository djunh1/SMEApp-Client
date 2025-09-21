import { createStore } from 'vuex'
import state from './state'
import { GlobalState } from './types'
import portfolioManagement from './modules/portfolioManagement';
import stockManagement from './modules/stockManagement';
import paginationManagement from './modules/paginationManagement';

const store = createStore({
  state,
  modules: {
    portfolioManagement: portfolioManagement,
    stockManagement: stockManagement,
    paginationManagement: paginationManagement
  }
})

export default store;