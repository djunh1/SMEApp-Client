import api from "../api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
    stocks: "stocks/"
}

export const loadStocks = () => {

    return new Promise((resolve, reject) => {
        api.get(URLS.stocks)
        .then((response: AxiosResponse) => {
            if(response.status === 200){
                resolve(response.data);
            } else {
                reject();
            }
        })
        .catch((error: AxiosError) => {
            console.log("error in loading portfolios -> ", error)
        }); 
    });
};