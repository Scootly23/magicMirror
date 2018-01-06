var firebase_config = require('../configs/firebase.config.js');
var firebase = require('firebase');

firebase.initializeApp(firebase_config.fb_config);
var dbRoot = firebase.database().ref();

module.exports.getMessages = function(location,callback){
    dbRoot.child('messages').once('value').then(function(snap){
        var message = snap.val()[0].LivingRoom
        callback(message);
    });
}