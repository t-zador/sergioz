const path = require("path");
const express = require("express");
const data = require("./data");

const app = express();
module.exports = app;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use("/", (req, res, next) => {
  if (req.hostname === "www.sergioz.co") {
    return res.redirect(`https://sergioz.co${req.originalUrl}`);
  }
  if (req.get("x-appengine-https") == "off") {
    return res.redirect(`https://${req.hostname}${req.originalUrl}`);
  }
  next();
});

app.get("/", (req, res) => {
  res.header("Cache-Control", "no-cache");
  res.header("Content-Type", "text/html; charset=utf-8");
  res.render("index", data);
});

app.get("/:picture", (req, res) => {
  res.header("Cache-Control", "no-cache");
  res.header("Content-Type", "text/html; charset=utf-8");
  res.render("detail", { picture: req.params.picture, data });
});

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
