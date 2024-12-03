import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

let SECRET_KEY = "my secret key";

let secureStorage;

let _initSecSore = (lS, SCK = SECRET_KEY) => {
  secureStorage = new SecureStorage(lS, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SCK);

      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SCK);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SCK);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    },
  });
};

// there is no need to stringify/parse you objects before and after storing.

//secureStorage.setItem('data', data);
// stores in localStorage like:
// key => value
// "ad36d572..." => "w1svi6n..."

//let decryptedData = secureStorage.getItem('data');
// returns { secret: 'data' }

//secureStorage.removeItem('data');
// removes the entry 'data'

//secureStorage.key(id)
// returns the hashed version of the key you passed into setItem with the given id.

//secureStorage.clear();
// clears all data in the underlining sessionStorage/localStorage.

//secureStorage.length;
// the number of entries in the underlining sessionStorage/localStorage.

export { _initSecSore, secureStorage };
