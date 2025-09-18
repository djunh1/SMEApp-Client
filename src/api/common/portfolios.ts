import api from "@/api/api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
  portfolios: "portfolio-filters/",
};

export const loadPortfolios = () => {
  return new Promise((resolve, reject) => {
    api
      .get(URLS.portfolios)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
            // Not paginated do not need response.data.results
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in load portfolios >> ", error);
      });
  });
};