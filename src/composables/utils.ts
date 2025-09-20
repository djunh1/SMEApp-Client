import dayjs from "dayjs";

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