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

/**
 * gathering all media tags and unmute them except one tag
 * @param  {Node} elem video or audio element node
 * @return {Node} elem node that its muted became true and volume became 0
 */
export const muteMe = (elem) => {
  elem.muted = true;
  elem.volume = 0;
};

/**
 * gathering all media tags and unmute them except one tag
 * @param  {Node} elem video or audio element node
 * @return {Node} elem node that its muted became false and volume became 1
 */
export const unMuteMe = (elem) => {
  elem.muted = false;
  elem.volume = 1;
};

// Try to mute all video and audio elements on the page
export const mutePage = () => {
  return document
    .querySelectorAll("video, audio")
    .forEach((elem) => muteMe(elem));
};

/**
 * gathering all media tags and unmute them except one tag
 * @param  {Node} exceptionNode Particulat media tag that must stay mute
 * @param  {NodeList} nodes All video and audio tags in app
 * @return {Node}   node that unmuted and volume turn to 1
 */
export const unMutePage = (exceptionNode) => {
  const nodes = document.querySelectorAll("video, audio");
  nodes.forEach((elem) => {
    if (exceptionNode) {
      if (elem !== exceptionNode) unMuteMe(elem);
    } else {
      unMuteMe(elem);
    }
  });
};

/**
 * gathering all media tags and unmute them except one tag
 * @param  {string} id of a video node
 * @return {Node}  video elem node
 */
export const videoNode = (id) => {
  return document.getElementById(`${id}`);
};

export const mediaElementIsPlaying = (el) => {
  return (
    el && el.currentTime > 0 && !el.paused && !el.ended && el.readyState > 2
  );
};

export const videoIsPlaying = !![
  ...document.getElementsByTagName("video"),
].find((el) => mediaElementIsPlaying(el));

export const audioIsPlaying = !![
  ...document.getElementsByTagName("audio"),
].find((el) => mediaElementIsPlaying(el));
