var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

//any routes entered will display home page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});