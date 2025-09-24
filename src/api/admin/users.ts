import { ILoginCredentials } from "@/models/iLoginCredentials";
import axios from "axios";

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