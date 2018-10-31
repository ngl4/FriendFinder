
//Load Data (require Data) from friends.js file
var friendsData = require("../data/friends");

module.exports = function(app) {

//API GET request to parse those Data into JSON
//Getting information
app.get("/api/friends", function (req, res) {
    res.json(friendsData);
});


//API Post request to submit into Data 
app.post("/api/friends", function (req, res) {

    //function to compare two scores arrays
    function compareScores(array1, array2) {

        //total difference is adding the difference of two scores indexes one by one 
        var totalDiff = 0; 

        //Compare two scores' indexes array 
        for (var i=0; i<array1.length; i++) {
            if (array1[i] === array2[i]) {
                totalDiff += 0;

            }else if (array1[i] !== array2[i]){
                if (array1[i] > array2[i]){
                    var indexDiff = array1[i] - array2[i];
                    totalDiff += indexDiff;

                }else if (array1[i] < array2[i]) {
                    var indexDiff = array2[i] - array1[i];
                    totalDiff += indexDiff;
                }
            }
        }
        //push to diffArray to get minimum difference later
        diffArray.push(totalDiff);
        //push to compareResultsArray for later comparison and accessibility 
        compareResultsArray.push({
            name: friendsData[friendsIndex].name,
            photo: friendsData[friendsIndex].photo,
            intro: friendsData[friendsIndex].intro,
            totalDiff: totalDiff
        });

    };

    //push new friend into the database (friends.js)
    var newFriend = req.body;
    friendsData.push(newFriend);

    var diffArray=[];
    var compareResultsArray =[];

    //logic to compare two scores array of new friend and other friends in the database
    var friendsIndex = friendsData.length - 2;
    while(friendsIndex >= 0) {
        compareScores(newFriend.scores,friendsData[friendsIndex].scores);
        friendsIndex--;
    }

    //find the minimun difference in diffArray 
    var min = Math.min.apply(Math, diffArray);
    
    var best_match = [];

    //successfully display best match here!!!
    for(var i=0; i<compareResultsArray.length; i++) {
        if (compareResultsArray[i].totalDiff=== min) {
            best_match.push(compareResultsArray[i].name);
            best_match.push(compareResultsArray[i].photo);
            best_match.push(compareResultsArray[i].intro);
        }
    }
    
    //display these response to the front-end at 'data' from "$.post ...function(data)""
    res.json({
        ok: true,
        new_friend: newFriend,
        friends: friendsData,
        best_match: best_match
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

};