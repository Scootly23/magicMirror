let weather = require('weather-js');

module.exports.getCurrentWeather = function(lat,long,callback)
{
   weather.find({search: lat+', '+long, degreeType: 'F'}, function(err, result) {
  if(err) console.log(err);
  result = result[0]
  var response = {
      location: result.location.name,
      weatherImageURL: result.location.imagerelativeurl,
      temperature:result.current.temperature,
      description: result.current.skytext
    };
    callback(response);
});
}