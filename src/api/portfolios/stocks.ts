import { iStock } from "@/models/iStock";
import api from "../api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
    stocks: "stocks/"
}

export const loadStocks = () => {
    return new Promise((resolve, reject) => {
        api.get(URLS.stocks)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    resolve(response.data.results);
                } else {
                    reject();
                }
            })
            .catch((error: AxiosError) => {
                console.log("error in loading all stocks -> ", error)
            });
    });
};

// Partial doesnt use all the fields.  
// TODO  dynamicallhy search for stock comapny name and the sector
export const addNewStock = (newStockRecord: Partial<iStock>) => {
    return new Promise((resolve, reject) => {
        api.post(URLS.stocks,
            {
                portfolio: newStockRecord.portfolioId,
                ticker_name: newStockRecord.tickerName,
                created_at: new Date()

            }).then((response: AxiosResponse) => {
                if (response.status === 201) {
                    return resolve(response.data);
                } else {
                    reject();
                }
            }).catch((error: AxiosError) => {
                console.log("error in adding the stock -> ", error)
            });
    });
};

export const editRecordInStocks = (id: string, editedStonk: iStock) => {
    return new Promise((resolve, reject) => {
        console.log("The new way to reference an ID ==> ", editedStonk.portfolio!.id)
        api.patch(URLS.stocks + id + '/', {
            ticker_name: editedStonk.tickerName,
            portfolio: editedStonk.portfolio!.id,
        }).then((response: AxiosResponse) => {
            if (response.status === 200) {
                resolve(response.data);
            } else {
                reject();
            }
        }).catch((error: AxiosError) => {
            console.log("Error in updating this stocks portfolio,", error)
        });
    });
};

export const getStockDetails = (stockId: string) => {
    return new Promise((resolve, reject) => {
        api
            .get(URLS.stocks + stockId + "/") //, {}
            .then((response: AxiosResponse) => {

                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject();
                }
            })
            .catch((error: AxiosError) => {
                console.log("caught error in stock details >> ", error);
            });
    });
}

export const deleteRecordInStocks = (id: string) => {
    return new Promise((resolve, reject) => {
        api.delete(URLS.stocks + id + '/')
            .then((response: AxiosResponse) => {
                if (response.status === 204) {
                    resolve(response.data);
                } else {
                    reject();
                }
            }).catch((error: AxiosError) => {
                console.log("Error in deleting stock record,", error);
                reject(error);
            });
    });
};