
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

    //function to compare two arrays
    function compareScores(array1, array2) {

        //Total difference variable
        var totalDiff = 0; 

        //COMPARE THE TWO NUMBER ARRAYS

        for (var i=0; i<array1.length; i++) {
            if (array1[i] === array2[i]) {
                totalDiff = totalDiff + 0;

            }else if (array1[i] !== array2[i]){
                if (array1[i] > array2[i]){
                    var indexDiff = array1[i] - array2[i];
                    totalDiff = totalDiff + indexDiff;

                }else if (array1[i] < array2[i]) {
                    var indexDiff = array2[i] - array1[i];
                    totalDiff = totalDiff + indexDiff;
                }
            }
        }
        console.log(friendsData[friendsIndex].name + " : " + totalDiff);
        console.log("\n-------------\n");

        diffArray.push(totalDiff);

        compareResultsArray.push({
            name: friendsData[friendsIndex].name,
            photo: friendsData[friendsIndex].photo,
            totalDiff: totalDiff
        });

    };

    var newFriend = req.body;
    friendsData.push(newFriend);

    var diffArray=[];
     var compareResultsArray =[];

    var friendsIndex = friendsData.length - 2;
    while(friendsIndex >= 0) {
        compareScores(newFriend.scores,friendsData[friendsIndex].scores);
        friendsIndex--;
    }

    var min = Math.min.apply(Math, diffArray);
        console.log(min);
    
    var best_match = [];

    //successfully display best match here!!!
    for(var i=0; i<compareResultsArray.length; i++) {
        if (compareResultsArray[i].totalDiff=== min) {
            console.log(compareResultsArray[i].name);
            console.log(compareResultsArray[i].photo);
            best_match.push(compareResultsArray[i].name);
            best_match.push(compareResultsArray[i].photo);
        }
    }
    
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