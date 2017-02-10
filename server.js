var express = require("express");
var app     = express();
var path    = require("path");
var port = process.env.PORT || 8080;
var Twit 	= require('twit');
var config 	= require('./config');
// var postget 	= require('./postget');
var http = require('http');
var url = require('url');
var fs = require('fs');

var bodyParser = require("body-parser");


var google = require('googlemaps');


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// //-------------------------------------------------
// // TWEETING BEGINS
// //-------------------------------------------------
console.log("The bot is starting");

// var Twit  = require('twit');
// var config  = require('./config');
// var rac  = require('./rac.js');
// var rac  = require('./test.js');
// var city = document.getElementById('address-input').value;
// var randomizer   = require('./randomizer');

var T = new Twit(config);
// var myTweet = randomizer;
// console.log(myTweet);

//-------------------------------------------------
// Random sentence
//-------------------------------------------------


//-------------------------------------------------
// Setting up a user stream to reply to followers
//-------------------------------------------------

//Setting up a user stream
// var stream = T.stream('user');
// // Any time someone follows me
// stream.on('follow', followed);

// function followed(eventMsg){
//  console.log("Follow Event");
//  var name = eventMsg.source.name;
//  var screenName = eventMsg.source.screen_name;
//  tweetIt('@' + screenName + ' Travel');
// }


//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//-------------------------------------------------
// get tweets based off my search, in this case q: travel withing the params var
//-------------------------------------------------

var params = {
  q: 'travel since:2011-07-11',
  count: 3
};
T.get('search/tweets', params, gotData);
var myArr = [];

function gotData(err, data, response) {
  var tweets = data.statuses

  for (var i = 0; i < tweets.length; i++) {
    myArr.push(tweets[i].text);

  }
  // return myArr;
 };
//
console.log(myArr);
//  get the list of user id's that follow @ractraveler
//
T.get('followers/ids', { screen_name: 'ractraveler' },  function (err, data, response) {
  // console.log(data)
})

//
//  tweet 'hello world!'
//
//-------------------------------------------------
// tweet function posts a tweet based off random sentence from getTweet function
//-------------------------------------------------

//


//set tweet interval
// setInterval(tweetIt, 1000*60*60);
// setInterval(tweetIt, 1000*20);

//post a status update tweet function using a random number to bypass twitters double post


var tweetIt = function(city) {
  if (city == null || city == "") {
        console.log("Please enter a city!");

    } else {
      var r = Math.floor(Math.random()*100);

          // ----------------------
          var randomizer = function(arr) {
            var randomize = Math.floor(Math.random()  * (arr.length - 0) + 0);
            // console.log(randomize);
            return randomize;
          }
          // var city = document.getElementById('city').value;

          // var city = addressInput;
          // var city = createInput;
          // var city = ["San Francisco", "Chicago", "New York", "Dublin", "London", "Moscow"]


          // var city = document.getElementById('city').value;
          var noun = ["account", "act", "addition", "adjustment", "advertisement", "agreement", "air", "amount", "amusement", "animal", "answer", "apparatus", "approval", "argument", "art", "attack", "attempt", "attention", "attraction", "authority", "back", "balance", "base", "behavior", "belief", "birth", "bit", "bite", "blood", "blow", "body", "brass", "bread", "breath", "brother", "building", "burn", "burst", "business", "butter", "canvas", "care", "cause", "chalk", "chance", "change", "cloth", "coal", "color", "comfort", "committee", "company", "comparison", "competition", "condition", "connection", "control", "cook", "copper", "copy", "cork", "cotton", "cough", "country", "cover", "crack", "credit", "crime", "crush", "cry", "current", "curve", "damage", "danger", "daughter", "day", "death", "debt", "decision", "degree", "design", "desire", "destruction", "detail", "development", "digestion", "direction", "discovery", "discussion", "disease", "disgust", "distance", "distribution", "division", "doubt", "drink", "driving", "dust", "earth", "edge", "education", "effect", "end", "error", "event", "example", "exchange", "existence", "expansion", "experience", "expert", "fact", "fall", "family", "father", "fear", "feeling", "fiction", "field", "fight", "fire", "flame", "flight", "flower", "fold", "food", "force", "form", "friend", "front", "fruit", "glass", "gold", "government", "grain", "grass", "grip", "group", "growth", "guide", "harbor", "harmony", "hate", "hearing", "heat", "help", "history", "hole", "hope", "hour", "humor", "ice", "idea", "impulse", "increase", "industry", "ink", "insect", "instrument", "insurance", "interest", "invention", "iron", "jelly", "join", "journey", "judge", "jump", "kick", "kiss", "knowledge", "land", "language", "laugh", "law", "lead", "learning", "leather", "letter", "level", "lift", "light", "limit", "linen", "liquid", "list", "look", "loss", "love", "machine", "man", "manager", "mark", "market", "mass", "meal", "measure", "meat", "meeting", "memory", "metal", "middle", "milk", "mind", "mine", "minute", "mist", "money", "month", "morning", "mother", "motion", "mountain", "move", "music", "name", "nation", "need", "news", "night", "noise", "note", "number", "observation", "offer", "oil", "operation", "opinion", "order", "organisation", "ornament", "owner", "page", "pain", "paint", "paper", "part", "paste", "payment", "peace", "person", "place", "plant", "play", "pleasure", "point", "poison", "polish", "porter", "position", "powder", "power", "price", "print", "process", "produce", "profit", "property", "prose", "protest", "pull", "punishment", "purpose", "push", "quality", "question", "rain", "range", "rate", "ray", "reaction", "reading", "reason", "record", "regret", "relation", "religion", "representative", "request", "respect", "rest", "reward", "rhythm", "rice", "river", "road", "roll", "room", "rub", "rule", "run", "salt", "sand", "scale", "science", "sea", "seat", "secretary", "selection", "self", "sense", "servant", "sex", "shade", "shake", "shame", "shock", "side", "sign", "silk", "silver", "sister", "size", "sky", "sleep", "slip", "slope", "smash", "smell", "smile", "smoke", "sneeze", "snow", "soap", "society", "son", "song", "sort", "sound", "soup", "space", "stage", "start", "statement", "steam", "steel", "step", "stitch", "stone", "stop", "story", "stretch", "structure", "substance", "sugar", "suggestion", "summer", "support", "surprise", "swim", "system", "talk", "taste", "tax", "teaching", "tendency", "test", "theory", "thing", "thought", "thunder", "time", "tin", "top", "touch", "trade", "transport", "trick", "trouble", "turn", "twist", "unit", "use", "value", "verse", "vessel", "view", "voice", "walk", "war", "wash", "waste", "water", "wave", "wax", "way", "weather", "week", "weight", "wind", "wine", "winter", "woman", "wood", "wool", "word", "work", "wound", "writing", "year"];
          var verb = ["accept", "add", "admire", "admit", "advise", "afford", "agree", "is", "was", "are", "has", "get", "see", "need", "know", "would", "find", "take", "want", "does", "learn", "become", "come", "include", "thank", "provide", "create", "add", "understand", "consider", "choose", "develop", "remember", "determine", "grow", "allow", "supply", "bring", "improve", "maintain", "begin", "exist", "tend", "enjoy", "perform", "decide", "identify", "continue", "protect", "require", "occur", "write", "approach", "avoid", "prepare", "build", "achieve", "believe", "receive", "seem", "discuss", "realize", "contain", "follow", "refer", "solve", "describe", "prefer", "prevent", "discover", "ensure", "expect", "invest", "reduce", "speak", "appear", "explain", "explore", "involve", "lose", "afford", "agree", "hear", "remain", "represent", "apply", "forget", "recommend", "rely", "vary", "generate", "obtain", "accept", "communicate", "complain", "depend", "enter", "happen", "indicate", "suggest", "survive", "appreciate", "compare", "imagine", "manage", "differ", "encourage", "expand", "prove", "react", "recognize", "relax", "replace", "borrow", "earn", "emphasize", "enable", "operate", "reflect", "send", "anticipate", "assume", "engage", "enhance", "examine", "install", "participate", "intend", "introduce", "relate", "settle", "assure", "attract", "distribute", "overcome", "owe", "succeed", "suffer", "throw", "acquire", "adapt", "adjust", "argue", "arise", "confirm", "encouraging", "incorporate", "justify", "organize", "ought", "possess", "relieve", "retain", "shut", "calculate", "compete", "consult", "deliver", "extend", "investigate", "negotiate", "qualify", "retire", "rid", "weigh", "arrive", "attach", "behave", "celebrate", "convince", "disagree", "establish", "ignore", "imply", "insist", "pursue", "remaining", "specify", "warn", "accuse", "admire", "admit", "adopt", "announce", "apologize", "approve", "attend", "belong", "commit", "criticize", "deserve", "destroy", "hesitate", "illustrate", "inform", "manufacturing", "persuade", "pour", "propose", "remind", "shall", "submit", "suppose", "translate"]
          var adverb = ["abnormally", "absentmindedly", "absolutely", "abundantly", "accordingly", "actively" , "carefully", "correctly", "eagerly", "easily", "fast", "loudly", "patiently", "quickly", "quietly", "accidentally", "intentionally", "always", "every", "never", "often", "rarely", "seldom", "sometimes", "after", "already", "during", "finally", "just", "last", "later", "next", "now", "recently", "soon", "then", "tomorrow", "when", "while", "Everywhere", "here", "there"]
          var adj = ["able", "acid", "angry", "automatic", "awake", "bad", "beautiful", "bent", "bitter", "black", "blue", "boiling", "bright", "broken", "brown", "certain", "cheap", "chemical", "chief", "clean", "clear", "cold", "common", "complete", "complex", "conscious", "cruel", "cut", "dark", "dead", "dear", "deep", "delicate", "dependent", "different", "dirty", "dry", "early", "elastic", "electric", "equal", "false", "fat", "feeble", "female", "fertile", "first", "fixed", "flat", "foolish", "free", "frequent", "full", "future", "general", "good", "gray", "great", "green", "hanging", "happy", "hard", "healthy", "high", "hollow", "ill", "important", "kind", "last", "late", "left", "like", "living", "long", "loose", "loud", "low", "male", "married", "material", "medical", "military", "mixed", "narrow", "natural", "necessary", "new", "normal", "old", "open", "opposite", "parallel", "past", "physical", "political", "poor", "possible", "present", "private", "probable", "public", "quick", "quiet", "ready", "red", "regular", "responsible", "right", "rough", "round", "sad", "safe", "same", "second", "secret", "separate", "serious", "sharp", "short", "shut", "simple", "slow", "small", "smooth", "soft", "solid", "special", "sticky", "stiff", "straight", "strange", "strong", "sudden", "sweet", "tall", "thick", "thin", "tight", "tired", "true", "violent", "waiting", "warm", "wet", "white", "wide", "wise", "wrong", "yellow", "young"]
          var tweet = "";

          tweet = (city + " " + noun[randomizer(noun)]  + ". "  + adverb[randomizer(adverb)] + " " + adj[randomizer(adj)]  + " " + noun[randomizer(noun)] + ". " + verb[randomizer(verb)]  + " " + noun[randomizer(noun)] + ". \n");
          // tweet = (city[randomizer(city)] + " " + noun[randomizer(noun)]  + ". "  + adverb[randomizer(adverb)] + " " + adj[randomizer(adj)]  + " " + noun[randomizer(noun)] + ". " + verb[randomizer(verb)]  + " " + noun[randomizer(noun)] + ". \n");

          // $('#tweeter').append("<p>Tweet: " + tweet + "</p>");

          // var myTweet = getTweet();
        // --------------------------

    var tweety = r + '.' + " " + tweet + '.';
    var tweet = {
      status: tweety
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
      if (err) {
        console.log("Wrong");
      } else {
        console.log("it works");
      }
    }
  }
}

// // tweetIt(myTweet);

// //-------------------------------------------------
// // END OF TWEETING
// //-------------------------------------------------

//-------------------------------------------------
// GOOGLE MAP SEARCH
//-------------------------------------------------

// The following searches on google maps for the city on the text input:


//-------------------------------------------------
// END GOOGLE MAP SEARCH
//-------------------------------------------------


app.get('/banana',function(req,res){
  res.send("success");
});

app.post('/banana2', function(req, res) {
  tweetIt(req.body.name);
  res.sendStatus(200);

});


app.listen(port);
console.log("Running at Port " + port + " http://localhost:"+port);