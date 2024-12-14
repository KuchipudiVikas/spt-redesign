import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1);
}

export function generateOptions(start: number, end: number) {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
}

export function generateRandomSolution(
  rows: number,
  cols: number
): Array<boolean> {
  const solution: Array<boolean> = new Array(rows * cols)
    .fill(false)
    .map(() => Math.random() < 0.5);
  return solution;
}

export function generateAlphabets() {
  const options = [];
  for (let i = 65; i <= 90; i++) {
    const label = String.fromCharCode(i).toUpperCase();
    options.push({ label: label, value: label });
  }
  return options;
}

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const monthsFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const weekDaysFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatDate(d, addSec: any = false) {
  let date = new Date(d);
  if (addSec) {
    date.setSeconds(date.getSeconds() + addSec);
  }

  let hour: any = date.getHours();
  let ampm = hour < 11 ? "AM" : "PM";
  hour = hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  hour = String(hour).padStart(2, "0");

  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
    2,
    "0"
  )}, ${date.getFullYear()} [${hour}:${String(date.getMinutes()).padStart(
    2,
    "0"
  )} ${ampm}]`;
}

export function chunkify_collection(coll, chunk_size = 100) {
  let i,
    j,
    chunk = Number(chunk_size);
  let arr = [];
  for (i = 0, j = coll.length; i < j; i += chunk) {
    arr.push(coll.slice(i, i + chunk));
  }
  return arr;
}

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// add separating commas on number
export function addSeparatingCommas(number) {}

export const timeInDays = {
  day: 1,
  week: 7,
  month: 30,
  year: 365,
};

export function shiftArrayToRight(_arr) {
  let arr = JSON.parse(JSON.stringify(_arr));
  arr.unshift(arr.pop());
  return arr;
}

export function shiftArrayToLeft(_arr) {
  let arr = JSON.parse(JSON.stringify(_arr));
  arr.push(arr.shift());
  return arr;
}

export const iconsList = [
  { label: "Cell", value: "icon_0_0" },
  { label: "Tablet", value: "icon_0_1" },
  { label: "Laptop", value: "icon_0_2" },
  { label: "Camera", value: "icon_0_3" },
  { label: "Mouse", value: "icon_0_4" },
  { label: "Badge", value: "icon_0_5" },
  { label: "Magnifying Glass", value: "icon_0_6" },
  { label: "Marker", value: "icon_0_7" },
  { label: "Cloud", value: "icon_0_8" },
  { label: "Upload", value: "icon_0_9" },
  { label: "Download", value: "icon_1_0" },
  { label: "Shopping Cart", value: "icon_1_1" },
  { label: "Diary", value: "icon_1_2" },
  { label: "Molecule", value: "icon_1_3" },
  { label: "Film", value: "icon_1_4" },
  { label: "Calculator", value: "icon_1_5" },
  { label: "Phone", value: "icon_1_6" },
  { label: "Microphone", value: "icon_1_7" },
  { label: "Printer", value: "icon_1_8" },
  { label: "Battery", value: "icon_1_9" },
  { label: "Robot", value: "icon_2_0" },
  { label: "Rocket", value: "icon_2_1" },
  { label: "Clock", value: "icon_2_2" },
  { label: "Music", value: "icon_2_3" },
  { label: "Chain", value: "icon_2_4" },
  { label: "Pin", value: "icon_2_5" },
  { label: "Chat", value: "icon_2_6" },
  { label: "Internet", value: "icon_2_7" },
  { label: "Globe", value: "icon_2_8" },
  { label: "Globe Simplified", value: "icon_2_9" },
  { label: "Shield", value: "icon_3_0" },
  { label: "Lock", value: "icon_3_1" },
  { label: "Unlock", value: "icon_3_2" },
  { label: "Car", value: "icon_3_3" },
  { label: "Folder", value: "icon_3_4" },
  { label: "Doc", value: "icon_3_5" },
  { label: "Mail", value: "icon_3_6" },
  { label: "Floppy", value: "icon_3_7" },
  { label: "House", value: "icon_3_8" },
  { label: "Picture", value: "icon_3_9" },
  { label: "Calender", value: "icon_4_0" },
  { label: "Shutdown", value: "icon_4_1" },
  { label: "Tools", value: "icon_4_2" },
  { label: "Gear", value: "icon_4_3" },
  { label: "Light Bulb", value: "icon_4_4" },
  { label: "Dustbin", value: "icon_4_5" },
  { label: "Tick", value: "icon_4_6" },
  { label: "Cross", value: "icon_4_7" },
  { label: "Down", value: "icon_4_8" },
  { label: "Up", value: "icon_4_9" },
  { label: "Piechart", value: "icon_5_0" },
  { label: "Dollar", value: "icon_5_1" },
  { label: "Dollar Coins", value: "icon_5_2" },
  { label: "Money Bag", value: "icon_5_3" },
  { label: "Tag", value: "icon_5_4" },
  { label: "Barchart", value: "icon_5_5" },
  { label: "Barchart Rising", value: "icon_5_6" },
  { label: "Barchart Falling", value: "icon_5_7" },
  { label: "Man", value: "icon_5_8" },
  { label: "Woman", value: "icon_5_9" },
  { label: "Man & Woman", value: "icon_6_0" },
  { label: "Bag", value: "icon_6_1" },
  { label: "People", value: "icon_6_2" },
  { label: "Connected People", value: "icon_6_3" },
  { label: "Card", value: "icon_6_4" },
  { label: "Flow Diagram", value: "icon_6_5" },
  { label: "Thumbs Up", value: "icon_6_6" },
  { label: "First", value: "icon_6_7" },
  { label: "Pen", value: "icon_6_8" },
  { label: "Diamond", value: "icon_6_9" },
];

export const fadeInAnimationsVariants = {
  initial: {
    opacity: 0,
    x: 60,
    y: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: 0.1,
      type: "spring",
      duration: 1.5,
    },
  },
};
export const AccountUtils = {
  checkOwnerShip: (featuresOwned, productId) => {
    if (Array.isArray(featuresOwned)) {
      return featuresOwned.some(
        (feature) => feature.feature_shop === productId
      );
    } else {
      return false;
    }
  },
  isOwned: (featuresOwned, id) => {
    return featuresOwned?.find((item) => item.feature_shop === id);
  },
};

export const ArrayUtils = {
  chunkArray: (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  },
};

export const BrowserUtils = {
  getLocalDate: (date) => {
    return new Date(date).toLocaleDateString();
  },
};

export function camelCaseToTitle(camelCase) {
  let words = camelCase.split(/(?=[A-Z])/);
  let title = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return title;
}
