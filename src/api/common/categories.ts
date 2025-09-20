import api from "@/api/api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
  categories: "categories/",
  categoriesUnpaged:'categories-unpaged/',
  categoryIds: 'category-ids/'
};

export const loadCategories = () => {
  return new Promise((resolve, reject) => {
    api
      .get(URLS.categories, {})
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          resolve(response.data.results);
        } else {
          reject();
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in load categories >> ", error);
      });
  });
};

export const loadCategoriesUnPaged = () => {
  return new Promise((resolve, reject) => {
    api
      .get(URLS.categoriesUnpaged, {})
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error: AxiosError) => {
        console.log("caught error in load categories >> ", error);
      });
  });
};