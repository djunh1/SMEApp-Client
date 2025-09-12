import { iPortfolio } from "@/models/iPortfolio";
import api from "../api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
    portfolios: "portfolios/"
}

export const loadPortfolios = () => {

    return new Promise((resolve, reject) => {
        api.get(URLS.portfolios)
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

export const addNewPortfolio = (newPortfolioRecord: Partial<iPortfolio>) => {
    return new Promise( (resolve, reject) => {
        api.post(URLS.portfolios, 
            {
            name: newPortfolioRecord.name,
            description: newPortfolioRecord.description,
            portfolio_type: newPortfolioRecord.portfolioType
        }).then((response: AxiosResponse) => {
            if (response.status === 201) {
                    resolve(response.data);
                } else {
                    reject();
                }
            }).catch((error: AxiosError) => {
                console.log("error adding the new portfolio," , error)
            });
    }); 
};

export const editRecordInPortfolios = (id: string, editedPortfolio: iPortfolio) => {
    return new Promise( (resolve, reject) => {
        api.patch(URLS.portfolios + id + '/', {
            name: editedPortfolio.name,
            description: editedPortfolio.description,
            portfolio_type: editedPortfolio.portfolioType
        }).then((response: AxiosResponse) => {
            if (response.status === 200) {
                resolve(response.data);
            } else {
                reject();
            }
            }).catch((error: AxiosError) => {
                console.log("Error in updating portflio," , error)
            });
        });
    };

    export const deleteRecordInPortfolios = (id: string) => {
        return new Promise( (resolve, reject) => {
            api.delete(URLS.portfolios + id + '/')
            .then((response: AxiosResponse) => {
                if (response.status === 204) {
                resolve(response.data);
            } else {
                reject();
            }
            }).catch((error: AxiosError) => {
                console.log("Error in deleting portfolio record," , error);
                reject(error);
            });
        });
    };