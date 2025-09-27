import { getUsers, addUser, deleteUser, unblockUser } from "@/api/admin/admin";

import { IUser } from "@/models/iUser";

import { Commit } from "vuex";

import { GlobalState } from "../types";

export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    SET_USERS(state: GlobalState, context: IUser[]) {
      state.users = context;
    },
    ADD_USER(state: GlobalState, user: IUser) {
      user.is_blocked = false;
      user.is_active = true;
      user.passwd = "";
      state.users.push(user);
    },
    DELETE_USER(state: GlobalState, id: string) {
      // need filter to return user
      state.users = state.users.filter((user) => {
        return user.id != Number(id);
      });
    },
    UNBLOCK_USER(state: GlobalState, selectedUsername: string) {
      state.users[
        state.users.findIndex((user) => user.username === selectedUsername)
      ].is_blocked = false;
    },
  },
  actions: {
    setUsers({ commit }: { commit: Commit }) {
      getUsers()
        .then((data) => {
          commit("SET_USERS", data);
        })
        .catch(() => {
          return false;
        });
    },
    addUser({ commit }: any, user: Partial<IUser>) {
      return addUser(user)
        .then(() => {
          commit("ADD_USER", user);
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    deleteUser({ commit }: any, payload: Partial<IUser>) {
      return deleteUser(String(payload.id))
        .then(() => {
          commit("DELETE_USER", payload.id);
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    async unblockUser({ commit }: { commit: Commit }, payload: string) {
      return unblockUser(payload)
        .then(() => {
          commit("UNBLOCK_USER", payload);
          return true;
        })
        .catch((e: any) => {
          console.log("unblockUser is returning false ==>", e);
          return false;
        });
    },
  },
  getters: {
    getUsers(state: GlobalState) {
      return state.users;
    },
    getUser(state: GlobalState) {
      return false;
    },
  },
};
