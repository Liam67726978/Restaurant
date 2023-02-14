// 載入Express、handlebars
const express = require("express");
const exphbs = require("express-handlebars");
// 初始化 Express
const app = express();
// 載入餐廳資料
const restaurants = require("./restaurant.json");
// 端口號
const port = 3000;
// 設置 Express 使用 handlebars 模板引擎
app.set("view engine", "handlebars");
// 設置 handlebars 模板引擎默認佈局文件為 "main"
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// 告訴 Express 靜態文件放置的目錄
app.use(express.static("public"));

// 主頁面
app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurants.results });
});
// 餐廳詳細資訊頁面
app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurants.results.find((item) => {
    return item.id + "" === req.params.id;
  });
  res.render("show", { restaurant });
});
//搜尋功能
app.get("/search", (req, res) => {
  const keyword = restaurants.results.filter(
    (result) =>
      result.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
      result.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  );
  res.render("index", { restaurant: keyword });
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
