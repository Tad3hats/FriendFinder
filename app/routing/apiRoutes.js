var friends = require("../data/friends");


module.exports = function (app) {

    //all possible friends
    app.get("/api/friends", function (req, res) {
        for (var i = 0; i < friends.length; i++) {
            res.json(friends[i].photo);
            // console.log(friends);
        }
});

//Handle incoming survey results and handle survey compatibility logic     
app.post("/api/friends", function (req, res) {
    console.log(req.body);
    var lowestScore = 100;
    var match;
    var clientScore = req.body.scores.reduce((a, b) => parseInt(a) + parseInt(b), 0)

    for (var i = 0; i < friends.length; i++) {
        var friendScore = friends[i].scores.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        var difference = Math.abs(clientScore - friendScore);

        if (difference < lowestScore) {
            lowestScore = difference;
            match = friends[i];
        }
    }

    console.log(match);

    res.json(match);



})

}
