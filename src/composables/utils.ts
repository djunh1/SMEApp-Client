import dayjs from "dayjs";

import { IUser } from "@/models/iUser";
import { get as getFromStore } from "@/localStorage";
import { computed } from "vue";

const loggedUser = computed(() => getFromStore("logged.username"));

const formatDate = (date:Date) => {
    return dayjs(date).format('MM/DD/YYYY');
}

export default formatDate;


export const extractValues = (data: any) => {
  var names = data.map((item: any) => {
    return item[String(Object.keys(item))];
  });
  return names;
};

export const extractIds = (data: any) => {
  var ids = data.map((item: any) => {
    return item[String(Object.keys(item))];
  });
  return ids;
};

export const filterNoAdminUsers = (users: IUser[]) => {
  let filteredData = users.filter(
    (user: IUser) => user.username !== loggedUser.value
  );
  return filteredData;
};