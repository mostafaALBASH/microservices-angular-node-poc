const express = require("express");
const path = require("path");
const app = express();
console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
// });
// console.log(__dirname.slice(-4)+`/public`)
console.log(__dirname)
console.log(__dirname.substring(0, __dirname.length - 4))
app.use(express.static(__dirname.substring(0, __dirname.length - 4)+`/public`)); //Serves resources from public folder
module.exports = app;
