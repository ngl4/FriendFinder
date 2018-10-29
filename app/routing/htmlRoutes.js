var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Linking external css to HTML
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.get("/survey.html", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});