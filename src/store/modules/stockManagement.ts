import { loadStocks } from "@/api/portfolios/stocks";
import { GlobalState } from "../types";
import { Commit } from "vuex";

export default {
    namespaced: true,
    mutations: {
        SET_STOCKS(state: GlobalState, context: any) {
            state.stocks = context;
        }

    },
    actions: {
        async setStocks( {commit}: {commit: Commit}, payload: any) {
            let data = await loadStocks();
            commit('SET_STOCKS', data);
            return data
        }

    },
    getters: {
        getStocks(state: GlobalState) {
            return state.stocks;
        }

    }
}