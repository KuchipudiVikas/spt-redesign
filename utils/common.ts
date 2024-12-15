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

/**
 * Adjusts a color to make it lighter or darker, preserving the hue.
 * Supports hex, rgb, and hsl formats.
 * @param color - The color string in hex (e.g., "#00ff00"), rgb (e.g., "rgb(0,255,0)"), or hsl (e.g., "hsl(120,100%,50%)") format.
 * @param amount - Percentage to lighten (positive value) or darken (negative value).
 * @returns The adjusted color string in the same format as the input.
 */
export function lightenColor(color: string, amount: number = 20): string {
  return adjustColorShade(color, Math.abs(amount));
}

export function darkenColor(color: string, amount: number = 20): string {
  return adjustColorShade(color, -Math.abs(amount));
}

function adjustColorShade(color: string, amount: number): string {
  if (color.startsWith("#")) {
    return adjustHexShade(color, amount);
  } else if (color.startsWith("rgb")) {
    return adjustRgbShade(color, amount);
  } else if (color.startsWith("hsl")) {
    return adjustHslShade(color, amount);
  } else {
    throw new Error("Unsupported color format. Use hex, rgb, or hsl.");
  }
}

// Adjusts hex color brightness
function adjustHexShade(hexColor: string, amount: number): string {
  if (hexColor.length === 4) {
    hexColor =
      "#" +
      hexColor
        .slice(1)
        .split("")
        .map((char) => char + char)
        .join("");
  }

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const adjust = (channel: number) =>
    Math.max(
      0,
      Math.min(
        255,
        channel + (amount / 100) * (amount > 0 ? 255 - channel : channel)
      )
    );

  const newR = adjust(r);
  const newG = adjust(g);
  const newB = adjust(b);

  const toHex = (channel: number) => channel.toString(16).padStart(2, "0");
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

// Adjusts RGB color brightness
function adjustRgbShade(rgbColor: string, amount: number): string {
  const matches = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!matches) {
    throw new Error("Invalid RGB color format. Expected format: rgb(r, g, b)");
  }

  const [_, r, g, b] = matches.map(Number);

  const adjust = (channel: number) =>
    Math.max(
      0,
      Math.min(
        255,
        channel + (amount / 100) * (amount > 0 ? 255 - channel : channel)
      )
    );

  const newR = adjust(r);
  const newG = adjust(g);
  const newB = adjust(b);

  return `rgb(${newR}, ${newG}, ${newB})`;
}

// Adjusts HSL color brightness
function adjustHslShade(hslColor: string, amount: number): string {
  const matches = hslColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!matches) {
    throw new Error(
      "Invalid HSL color format. Expected format: hsl(h, s%, l%)"
    );
  }

  const [_, h, s, l] = matches.map(Number);

  const newL = Math.max(0, Math.min(100, l + amount));

  return `hsl(${h}, ${s}%, ${newL}%)`;
}

export const isOwned = (featuresOwned, id) => {
  return featuresOwned?.find((item) => item.feature_id._id === id);
};
