import CryptoJS from "crypto-js";

const key = "mysecretkey12345";

export const encryptString = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, key).toString();

  const urlSafeEncrypted = encrypted
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return urlSafeEncrypted;
};

export const decryptString = (cipherText) => {
  const base64CipherText = cipherText.replace(/-/g, "+").replace(/_/g, "/");

  const decryptedBytes = CryptoJS.AES.decrypt(base64CipherText, key);
  const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);

  return decrypted;
};
