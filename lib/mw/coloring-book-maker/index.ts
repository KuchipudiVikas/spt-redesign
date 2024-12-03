import axios from "axios";
import * as process from "process";
import CryptoJS from "crypto-js";
import { SOURCE, localStorage_tokenloc, bulsupips_debug } from "../utils/_vars";
export class ColoringBookMakerApi {
  getCategoriesAndSubcategories = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const key = process.env.DIGITAL_ASSETS_KEY;
        const url = `${SOURCE}/api/digital-assets/all`;
        const encryptedData = await axios.get(url);
        const bytes = CryptoJS.AES.decrypt(encryptedData.data.data, key);
        const jsonData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const categoriesList = [];
        const subcategoriesList = [];
        const categoriesCount = {};
        const subcategoriesCount = {};
        // const uniqueCatList = [];
        // const categoriesObj = {}; // {category: number}
        for (let index = 0; index < jsonData.length; index++) {
          try {
            const element = jsonData[index];

            // const categories = element.fpath
            //   .split(/[\/,]/)
            //   .map((item) => item.trim())
            //   .filter((item) => item.length > 0);
            const splittedItems = element.fpath
              .split("/")
              .map((item) => item.trim())
              .filter((item) => item.length > 0);
            categoriesList.push(splittedItems[0]);
            if (splittedItems.length > 1)
              subcategoriesList.push(splittedItems[1]);

            // categoriesList.push(...categories);
            // uniqueCatList.push(...[...new Set(categories)]);
          } catch (e) {
            console.error(e);
          }
        }

        categoriesList.forEach((item) => {
          categoriesCount[item] = (categoriesCount[item] || 0) + 1;
        });

        subcategoriesList.forEach((item) => {
          subcategoriesCount[item] = (subcategoriesCount[item] || 0) + 1;
        });

        const categories = [...new Set(categoriesList)];
        const subcategories = [...new Set(subcategoriesList)];

        resolve({
          categories: {
            categories,
            categoriesCount,
          },
          subcategories: {
            subcategories,
            subcategoriesCount,
          },
        });

        // resolve({categories, subcategories})
      } catch (e) {
        reject(e);
      }
    });
  };
}
