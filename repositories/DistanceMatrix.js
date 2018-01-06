let distance = require('google-distance-matrix');
distance.key('AIzaSyBDCah_Dd21b8oqjxqnRqourtuSpUXWcOA');
distance.mode('driving');
distance.units('imperial');
distance.traffic_model('pessimistic');
distance.departure_time(new Date().getTime());

module.exports.getCommuteData = function(currentLat,currentLong,destLat,destLong,callback){
    console.log("PARAMS:",currentLat,currentLong,destLat,destLong);
    var origins = [currentLat+", "+currentLong];
    var destinations = [destLat+", "+destLong];
    distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
        //return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') 
    {
       var result = distances.rows[0].elements[0].duration_in_traffic;
       callback(result.text)
    }
});
}

    // var origin = new google.maps.LatLng(destLat,destLong);
    // // var destination = new google.maps.LatLng(44.820825, -93.464404);
    // var destination = new google.maps.LatLng(destLat, destLong);
    // var service = new google.maps.DistanceMatrixService();
    // service.getDistanceMatrix(
    //   {
    //     origins: [origin],
    //     destinations: [destination],
    //     travelMode: 'DRIVING',
    //     drivingOptions:{
    //         departureTime: new Date(Date.now()),
    //         trafficModel: 'pessimistic'
    //     }
    //   }, callback);
