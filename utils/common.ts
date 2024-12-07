import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";

export function isImageURL(url: string): boolean {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function formatCurrency(value, locale = "en-US", currency = "USD") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

function separateNumber(givenNumber) {
  const nfObject = new Intl.NumberFormat("en-US");
  const output = nfObject.format(givenNumber);

  return output;
}

export function roundToNone(num) {
  return +(Math.round(Number(num + "e+0")) + "e-0");
}

export function numberFormat(number: number): string {
  // Check if window is available to handle SSR
  const locale =
    typeof window !== "undefined" && window.navigator?.language
      ? window.navigator.language
      : "en-US";

  const roundedNumber = Math.round(number);
  return roundedNumber.toLocaleString(locale);
}

export const getDate = (sub: number = 0) => {
  const dateXDaysAgo = subDays(new Date(), sub);

  return format(dateXDaysAgo, "dd/MM/yyyy");
};

export const getDomainWithoutSubdomain = (url) => {
  try {
    // Ensure that the input is a non-empty string
    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL");
    }

    if (url === "localhost") {
      return url;
    }

    // Create URL object and extract hostname
    const urlParts = new URL(url).hostname.split(".");

    // Check if it's an IP address
    if (urlParts.length === 1) {
      return urlParts[0]; // Return IP address as is
    }

    // Extract the domain (excluding subdomains)
    return urlParts
      .slice(0)
      .slice(-(urlParts.length === 4 ? 3 : 2))
      .join(".");
  } catch (error) {
    console.error("Error in getDomainWithoutSubdomain:", error.message);
    return null; // Return null if the input URL is invalid
  }
};

export function stringToValidFilename(str: string): string {
  return (
    str
      .replace(/[^a-zA-Z0-9._-]/g, "_") // Replace invalid characters with underscores
      .replace(/_+/g, "_") // Replace multiple underscores with a single one
      .replace(/^_/, "") // Remove leading underscores
      .replace(/_$/, "") // Remove trailing underscores
      // remove spaces
      .replace(/\s+/g, "_")
      .toLowerCase() // Convert to lowercase
      .trim()
  ); // Trim any leading or trailing spaces
}
