import { AxiosResponse, AxiosError } from "axios";
import { IUser } from "@/models/iUser";
import api from "../api";

const URLS = {
  users: "users/"
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