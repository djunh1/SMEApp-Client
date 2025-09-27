import { AxiosResponse, AxiosError } from "axios";

import api from "../api";

const URLS = {
  users: "users/",
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    
    api
      .get(URLS.users, {})
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching all users", error);
      });
  });
};
