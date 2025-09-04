import dayjs from "dayjs";

const formatDate = (date:Date) => {
    return dayjs(date).format('MM/DD/YYYY');
}

export default formatDate;
