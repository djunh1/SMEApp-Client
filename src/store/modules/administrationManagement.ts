

import { getUsers } from "@/api/admin/admin";

import { IUser } from "@/models/iUser";

import { Commit } from "vuex";

import { GlobalState } from "../types";

export default {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    SET_USERS(state: GlobalState, context: IUser[]) {
      state.users = context;
    }
  },
  actions: {
    setUsers({ commit }: { commit: Commit }) {
      getUsers().then((data) => {
        commit('SET_USERS', data)
      }).catch(() => {
        return false;
      });
    }
  },
  getters: {
    getUsers(state: GlobalState) {
      return state.users;
    },
    getUser(state: GlobalState) {
      return false;
    },
  },
}