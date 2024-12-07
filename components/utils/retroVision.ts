import * as XLSX from "xlsx";
export const extractASIN = (url) => {
  var ASINreg = new RegExp(/(?:\/)([A-Z0-9]{10})(?:$|\/|\?)/);
  var cMatch = url.match(ASINreg);
  if (cMatch == null) {
    return null;
  }
  return cMatch[1];
};
export const extractDomainTLD = (url) => {
  // This regex captures domains like .com, .co.uk, .net, .org, etc.
  const domainRegex =
    /(?:https?:\/\/)?(?:www\.)?([^\/]+)\.([a-z]{2,}(?:\.[a-z]{2,})?)/;
  const match = url.match(domainRegex);

  if (match && match[2]) {
    // Check if there's a second-level domain
    const possibleSecondLevel = match[1].split(".").pop();
    if (possibleSecondLevel.length <= 3) {
      // typically, 2nd level domains like "co", "com" are 2 or 3 chars
      return `${possibleSecondLevel}.${match[2]}`;
    }
    return match[2]; // Return only the TLD
  }
  return null;
};

export const colorIndex = [
  "#ff8787",
  "#ffac7c",
  "#ffcf7a",
  "#feea7a",
  "#fff978",
  "#e0ff7a",
  "#deff73",
  "#c6ff6e",
  "#a7ff73",
  "#73ff71",
  "#73ff71",
];

export function convertToCSV(csvData, asin) {
  const worksheet = XLSX.utils.json_to_sheet(csvData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${asin}-Titans Retro View Data.xlsx`);
}
