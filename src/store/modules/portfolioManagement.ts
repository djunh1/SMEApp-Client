import { loadPortfolios } from "@/api/portfolios/portfolios";
import { GlobalState } from "../types";
import { Commit } from "vuex";
import { iPortfolio } from "@/models/iPortfolio";

export default {
    namespaced: true,

    mutations: {
        SET_PORTFOLIOS(state: GlobalState, context: any) {
            state.portfolios = context;
        },
        SET_PORTFOLIO_DETAILS(state: GlobalState, context: iPortfolio){
            state.portfolioDetails = context;
        }
    },

    actions: {
        async setPortfolios({ commit }: { commit: Commit }, payload: any) {
            let data = await loadPortfolios();
            //save the data to state
            commit("SET_PORTFOLIOS", data);
            return data;
        },
        async setPortfolioDetails({commit}: {commit: Commit}, payload: iPortfolio){
            commit("SET_PORTFOLIO_DETAILS", payload)
        }
    },

    getters: {
        getPortfolios(state: GlobalState) {
            return state.portfolios;
        },

        getPortfolioDetails(state: GlobalState){
            return state.portfolioDetails;
        }
    }
}