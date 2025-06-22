const request = require("request");
const path = require("path");
const fs = require("fs");

const id = (~~(Math.random() * 10000000)).toString();
const url = `https://robohash.org/${id}`;

const dirPath = path.resolve(process.cwd(), "pictures");
if (!fs.existsSync(dirPath)) {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    return;
  }
}
const dateArr = new Date().toLocaleDateString().split("/");
dateArr.unshift(dateArr.pop());
const date = dateArr.join("-");
request(url)
  .on("error", (err) => {})
  .pipe(fs.createWriteStream(`${dirPath}/${date}.png`))
  .on("finish", () => {});
