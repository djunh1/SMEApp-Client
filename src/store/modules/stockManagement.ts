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
        SET_STOCK_DETAILS(state: GlobalState, context: iStock) {
            state.stockDetails = context;
        },
        DELETE_STOCK(state: GlobalState, context: iStock) {
            state.stocks = state.stocks.filter(x => x.id !== context)
        },
        UPDATE_STOCK(state: GlobalState, context: any) {
            let index = state.stocks.findIndex(x => x.id === context.id)
            state.stocks[index] = {
                ...state.stocks[index],
                ticker_name: context.editedStock.tickerName,
                portfolio: context.editedStock.portfolio,
            }
        },
        POST_STOCK(state: GlobalState, context: any) {
            // Where does response object come from?
            state.stocks.unshift(context.responseObject)
        }


    },
    actions: {
        async setStocks({ commit }: { commit: Commit }, payload: any) {
            let data: any = await loadStocks(
                payload.search,
                payload.page,
                payload.per_page,
                payload.order_by
                );
            commit('SET_STOCKS', data.results);
            return data
        },
        async setStockDetails({ commit }: { commit: Commit }, payload: iStock) {
            commit("SET_STOCK_DETAILS");
        },
        async deleteStock({ commit }: { commit: Commit }, payload: iStock) {
            commit("DELETE_STOCK", payload)
        },
        async updateStock({ commit }: { commit: Commit }, payload: any) {
            commit("UPDATE_STOCK", payload)
        },
        async postStock({ commit }: { commit: Commit }, payload: any) {
            commit("POST_STOCK", payload)
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