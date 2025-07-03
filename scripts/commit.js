const request = require("request");
const path = require("path");
const fs = require("fs");

const id = (~~(Math.random() * 10000000)).toString();
const url = `https://robohash.org/${id}?set=set4`;

const dirPath = path.resolve(process.cwd(), "pictures");
if (!fs.existsSync(dirPath)) {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    return;
  }
}

// 获取当前日期和时间
const now = new Date();
const date = now.toLocaleDateString().split("/");
date.unshift(date.pop()); // 调整年份位置

// 格式化时间，保证两位数显示
const formatNumber = (n) => n < 10 ? `0${n}` : n;

const hours = formatNumber(now.getHours());
const minutes = formatNumber(now.getMinutes());
const seconds = formatNumber(now.getSeconds());

// YYYY-MM-DD-HH-mm-ss.png
const fileName = `${date.join("-")}-${hours}-${minutes}-${seconds}-(${id}).png`;

request(url)
  .on("error", (err) => {
    console.error("Download failed:", err);
  })
  .pipe(fs.createWriteStream(`${dirPath}/${fileName}`))
  .on("finish", () => {
    console.log(`Image saved as: ${fileName}`);
  });
