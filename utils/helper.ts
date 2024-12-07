import cookie from "cookie";

export default function numberWithCommas(x) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export function countWordsAndLetters(str: string): {
  wordCount: number;
  letterCount: number;
} {
  const words = str.split(" ").filter((word) => /[a-zA-Z]/.test(word));
  const letters = str.replace(/[^a-zA-Z]/g, "");

  return {
    wordCount: words.length,
    letterCount: letters.length,
  };
}
