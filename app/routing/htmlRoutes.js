var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// ------------------apiRoutes------------------

//Load Data (require Data) from friends.js file
var friendsData = require("../data/friends");

//API GET request to parse those Data into JSON
//Getting information
app.get("/api/friends", function (req, res) {
    res.json(friendsData);
});


//API Post request to submit into Data 
app.post("/api/friends", function (req, res) {
    //making more user-friendly function by adding if-else statement
    //if (){ 
    //figure out which friend or what is the best match??? 
    //store in a variable of best_match object
    //best_match: best_friend 
    //doing the whole comparison logic in here 
    //using if-else statement (res.json({ok: false}))
    //}else {
    //req.body.name="";
    //res.json({ok:false});
    //}

    //function to compare two arrays
    function compareScores(array1, array2) {

        //Total difference variable
        var totalDiff = 0; 

        console.log(array1);
        console.log(array2);
        console.log("\n-------------\n");

        //TODO HERE: 
        //COMPARE THE TWO NUMBER ARRAYS

        //IF THE NUMBERS ARE THE SAME LOG/RETURN 0
        //IF THE NUMBER 1 ARRAY INDEX IS LARGER THAN THE OTHER LOG OR RETURN THE DIFFERENCE
        //IF THE NUMBER 2 ARRAY INDEX IS LARGER THAN THE OTHER , SAME THING LIKE ABOVE


        //COMPARE THE TOTAL DIFFERENCE OF DIFFERENT ARRAY OBJECT (FIND THE SMALLEST DIFFERENCE)

        //RETURN THE BEST MATCH INTO AN OBJECT

    };

    var newFriend = req.body;
    friendsData.push(newFriend);

    var startingIndex = friendsData.length - 2;
    while(startingIndex>=0) {
        //console.log(friendsData[startingIndex].scores);
        compareScores(newFriend.scores,friendsData[startingIndex].scores);
        startingIndex--;
    }
    
    
    res.json({
        ok: true,
        new_friend: newFriend,
        friends: friendsData
    });
});

//API Data Clear out!
app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friendsData.length = [];

    res.json({
        ok: true
    });
});


// ------------------apiRoutes------------------

// ---------------- htmlRoutes------------------

//Linking external css to HTML
app.use(express.static(path.join(__dirname, '../public')));

app.get("/survey.html", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

//------------------- htmlRoutes-------------------

//any routes
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});