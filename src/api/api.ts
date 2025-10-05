import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { authorize } from "@/localStorage";
import { ILoginData } from "@/models/ILoginData";
import router from "@/router";
import { remove as removeFromStore } from "@/localStorage";

axios.defaults.headers.common["Content-Type"] = "application/json";

const axiosInstace = axios.create();
const baseURL = process.env.VUE_APP_BASE_URL;

const api = (axios: Axios) => {
  const controller = new AbortController();

  authorize("logged", (loginData: ILoginData) => {
    if (loginData) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + loginData.access_token;
      axios.defaults.baseURL = baseURL + "/api/v1";
    }
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.message === "Network Error" && !error.response) {
        console.log("Network error,", error);
      }

      if (error.response!.status === 401) {
        console.log("401 error , ", error);
        removeFromStore("logged");
        alert("Session is terminated. Log in again.");

        router.push({
          name: "dashboard",
        });
      } else {
        return Promise.reject(error);
      }
    }
  );

  const cancelRequests = () => {
    console.log("Cancelling API requests");
    controller.abort();
  };

  const sleep = (miliseconds: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>((resolve) => {
      setTimeout(() => resolve(response), miliseconds)
    })

  return {
    // get: <T>(url: string, config: any) => axios.get<T>(url, {signal: controller.signal, ...config }).then(sleep(1000)),
    get: <T>(url: string, config: any) => axios.get<T>(url, {...config }).then(sleep(1000)),
    post: <T>(url: string, body: object) => axios.post<T>(url, body),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(sleep(4000)),
    patch: <T>(url: string, body: object) => axios.patch<T>(url, body),
    delete: <T>(url: string) => axios.delete<T>(url),
    cancel: () => cancelRequests()
  };
};

export default api(axiosInstace);
