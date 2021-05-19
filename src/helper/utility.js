import _ from "lodash";

export const QueryHasValue = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.has(`${key}`);
};

export const objIsEmpty = (obj) => {
  for (let i in obj) return false;
  return true;
};

/// better way instead of switch case is to use Object literal
export const invoiceStatus = (statusType) => {
  let types = {
    paid: "پرداخت شده",
    unpaid: "پرداخت نشده",
    cancelld: "لغو شده",
    pending: "در حال بررسی",
    not_valid: "تایید نشده",
    refunded: "عودت داده شده",
  };
  const _Green = statusType === "paid";
  const _Yellow = statusType === "pending";
  const _Red =
    statusType === "not_valid" ||
    statusType === "unpaid" ||
    statusType === "cancelld";
  const _Gray = statusType === "refunded";
  return { type: types[statusType] || " ", _Green, _Yellow, _Red, _Gray };
};

export function getMainDomainWithoutWWW() {
  const hostName =
    (window.location.host.indexOf("www.") && window.location.host) ||
    window.location.host.replace("www.", "");
  const splitted = hostName.split(".");

  if (splitted.length > 2) {
    return splitted[1];
  } else {
    return " ";
  }
}

export function filterAndSort(
  collection,
  filterFunction,
  firstSortFunction,
  secondSortFunction = () => {}
) {
  return _(collection)
    .filter(filterFunction)
    .orderBy([firstSortFunction, secondSortFunction])
    .value();
}

export function convertArrayToObject(array, key) {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
}

export function getHour(date) {
  let time = new Date(date);
  let hour = time.toString().split(" ")[4]
    ? time.toString().split(" ")[4].substring(0, 5)
    : "";
  return hour;
}
