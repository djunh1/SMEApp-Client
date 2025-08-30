import axios, { AxiosResponse } from "axios";

export const loadPortfolios = () => {
    return axios.get('http://localhost:8000/api/v1/portfolios/')
    .then((response: AxiosResponse) => {
        console.log(response.data);
        return response.data;
    })
}