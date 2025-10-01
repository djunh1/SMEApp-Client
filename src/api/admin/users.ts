import { ILoginCredentials } from "@/models/iLoginCredentials";
import { IUser } from "@/models/iUser";
import api from "../api";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";

const URLS = {
  users: "users/",
};

export const authenticate = (creds: ILoginCredentials) => {
    axios.defaults.headers.common["Content-Type"] = "application/json";

    const baseUrl = process.env.VUE_APP_BASE_URL

    return axios.post(baseUrl + '/api/v1/token/', {
        username: creds.username,
        password: creds.password
    }, {}).then((response => {
        return response.status === 200
            ? Promise.resolve(response)
            : Promise.reject()
    })).catch((error) => {
        if (error.messages === "Network error") return error.message;
        return error.response;
    });
}

export const updateOwnProfile = (params: Partial<IUser>) => {
  return new Promise((resolve, reject) => {
    api
      .put(URLS.users + "update", {
        username: params.username,
        first_name: params.first_name,
        last_name: params.last_name,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          resolve(response);
        }
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const resetOwnPassword = (params: any) => {
  return (
    api
      .post(URLS.users + "user-reset-password", {
        new_passwd: params.new_passwd,
        confirm_passwd: params.confirm_passwd,
      })
      .then((response: AxiosResponse) => {
        return response.status === 200
          ? Promise.resolve(response)
          : Promise.reject();
      })
      .catch((error: any) => {
        return error;
      })
  );
};

export const deactivate = (username: string) => {
  return api
    .post(URLS.users + "deactivate", {
      username,
    })
    .catch((error) => {
      console.log("caught error in deactivateOwnProfile >> ", error);
    });
};