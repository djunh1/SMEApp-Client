import { loadPortfolios } from "@/api/portfolios/portfolios";
import { GlobalState } from "../types";
import { Commit } from "vuex";

export default {
    namespaced: true,

    mutations: {
        SET_PORTFOLIOS(state: GlobalState, context: any) {
            state.portfolios = context;
        }
    },

    actions: {
        async setPortfolios({ commit }: { commit: Commit }, payload: any) {
            let data = await loadPortfolios()

            //save the data to state
            commit('SET_PORTFOLIOS', data);
            return data;
        }
    },

    getters: {
        getPortfolios(state: GlobalState) {
            return state.portfolios;
        }
    }
}