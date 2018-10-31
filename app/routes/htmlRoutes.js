var express = require("express");
var path = require("path");



module.exports = function(app) {


//Linking external css to HTML
app.use(express.static(path.join(__dirname, '../public')));

app.get("/survey.html", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

}


