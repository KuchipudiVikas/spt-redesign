import path from "path";
import { promises as fs } from "fs";

function csvJSON(csv) {
  let lines = csv.split("\n");

  let result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  let headers = lines[0].trim().split(",");

  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return result; //JSON
}

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const csvDirectory = path.join(process.cwd(), "csvs/names");
  let firstNames = [];
  let lastNames = [];
  const fileContentsFirstName = await fs.readFile(
    csvDirectory + "/first_name.csv",
    { encoding: "utf-8" }
  );
  const fileContentsLastName = await fs.readFile(
    csvDirectory + "/last_name.csv",
    { encoding: "utf-8" }
  );

  firstNames = csvJSON(fileContentsFirstName);

  lastNames = csvJSON(fileContentsLastName);

  res.status(200).json({ firstNames: firstNames, lastNames: lastNames });
}
