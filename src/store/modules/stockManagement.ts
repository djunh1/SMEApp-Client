import { getStockDetails, loadStocks } from "@/api/portfolios/stocks";
import { GlobalState } from "../types";
import { Commit } from "vuex";
import { iStock } from "@/models/iStock";

export default {
    namespaced: true,
    mutations: {
        SET_STOCKS(state: GlobalState, context: any) {
            state.stocks = context;
        },
        SET_STOCK_DETAILS(state: GlobalState, context: iStock){
            state.stockDetails = context;
        }

    },
    actions: {
        async setStocks( {commit}: {commit: Commit}, payload: any) {
            let data = await loadStocks();
            commit('SET_STOCKS', data);
            return data
        },
        async setStockDetails({commit}: {commit: Commit}, payload: iStock) {
            commit("SET_STOCK_DETAILS");
        }

    },
    getters: {
        getStocks(state: GlobalState) {
            return state.stocks;
        },

        getStockDetails(state: GlobalState) {
            return state.stockDetails;
        }

    }
}