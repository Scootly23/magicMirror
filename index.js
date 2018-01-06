let express = require('express');
let app = express();
let http = require('http').Server(app);
let config = require('./config.json');

let commuteInfo = require('./repositories/DistanceMatrix.js');
let weather = require('./repositories/Weather.js');
let reddit = require('./repositories/RedditAPI.js');
let news = require('./repositories/News.js');
let firebase = require('./repositories/firebase.js');

app.use('/public',express.static(__dirname+'/public'));
app.use('/font',express.static(__dirname+'/font'))
app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/index.html');
    firebase.getMessages(function(res){
        console.log(res);
    });
});
app.get('/news',function(req,res){
    news.getTopStories(function(callback){

    });
});
app.get('/weather',function(req,res){
    var lat = req.param('lat');
    var long = req.param('long');
    weather.getCurrentWeather(lat,long,function(response){
        res.send(response);
        res.end();
    });
});
app.get('/reddit',function(req,res){
    reddit.getPostsBySubreddit(function(callback){
    });
});
app.get('/commute',function(req,res){
    var lat = req.param('lat');
    var long = req.param('long');
    commuteInfo.getCommuteData(lat,long,44.820825, -93.464404,function(response){
        res.send(response);
        res.end();
    });
});

http.listen(config.port,function(){
    console.log('listening on *:',config.port);
});