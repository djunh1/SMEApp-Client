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
        },
        DELETE_PORTFOLIO(state: GlobalState, context: iPortfolio){
            state.portfolios = state.portfolios.filter(x => x.id !== context)
        },
        UPDATE_PORTFOLIO(state: GlobalState, context: any){
            // Local record via index in the array
            let index = state.portfolios.findIndex(x => x.id === context.id)

            state.portfolios[index] = { ...state.portfolios[index],
                name: context.editedPortfolio.name,
                description: context.editedPortfolio.description,
                portfolio_type: context.editedPortfolio.portfolioType
            }
        },
        POST_PORTFOLIO(state: GlobalState, context: any){
            state.portfolios.unshift(context.responseObject);
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
        },
        async deletePortfolio({commit}: {commit: Commit}, payload: iPortfolio){
            commit("DELETE_PORTFOLIO", payload)
        },
        async updatePortfolio({commit}: {commit: Commit}, payload: any){
            commit("UPDATE_PORTFOLIO", payload)
        },

        async postPortfolio({commit}: {commit: Commit}, payload: any){
            commit('POST_PORTFOLIO', payload)
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