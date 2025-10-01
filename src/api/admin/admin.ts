import { AxiosResponse, AxiosError } from "axios";
import { IUser } from "@/models/iUser";
import { IPasswordUpdate } from "@/models/IPasswordUpdate";
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

export const getUser = (userId: string) => {
  return new Promise((resolve, reject) => {
    let urls = URLS.users + userId + "/"
    api
      .get(URLS.users + userId + "/", {})
      .then((response: any) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.error("get User >> ", error);
      });
  });
};

export const addUser = (body: Partial<IUser>) => {
  return api
    .post(URLS.users + `new`, {
      username: body.username,
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      is_staff: body.is_staff,
      passwd: body.passwd,
    })
    .catch((error) => {
      console.error("error in add User >> ", error);
    });
};

export const deleteUser = (id: string) => {
  return api.delete(URLS.users + `${id}/`).catch((error) => {
    console.error("error in delete User >> ", error);
  });
};

export const unblockUser = (username: string) => {
  return api
    .post(URLS.users + "admin-reset-login-attempts", {
      blocked_user: username,
    })
    .catch((error) => {
      console.error("error in unblock User >> ", error);
    });
};

export const updateUserStatus = (params: Partial<IUser>) => {
  return api
    .post(URLS.users + "update-status", {
      username: params.username,
      activity: params.is_active,
    })
    .catch((error) => {
      console.error("error in Update User status >> ", error);
    });
};

export const updateUserPassword = (params: IPasswordUpdate) => {
  return api
    .post(URLS.users + "admin-reset-password", {
      new_passwd: params.new_passwd,
      target_user: params.target_user,
    })
    .catch((error) => {
      console.error("error in Update User password >> ", error);
    });
};
