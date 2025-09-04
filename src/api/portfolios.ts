import axios, { AxiosResponse } from "axios";

export const loadPortfolios = () => {
    return axios.get('http://localhost:8000/api/v1/portfolios/')
    .then((response: AxiosResponse) => {
        return response.data;
    })
}

export const loadPortfolioStocks = () => {
    return axios.get('http://localhost:8000/api/v1/stocks/')
    .then((response: AxiosResponse) => {
        return response.data;
    })
}