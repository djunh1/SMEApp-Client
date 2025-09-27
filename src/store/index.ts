import { createStore } from 'vuex'
import state from './state'
import { GlobalState } from './types'
import portfolioManagement from './modules/portfolioManagement';
import stockManagement from './modules/stockManagement';
import paginationManagement from './modules/paginationManagement';
import administrationManagement from './modules/administrationManagement';

const store = createStore({
  state,
  modules: {
    portfolioManagement: portfolioManagement,
    stockManagement: stockManagement,
    paginationManagement: paginationManagement,
    administrationManagement: administrationManagement

  }
})

export default store;