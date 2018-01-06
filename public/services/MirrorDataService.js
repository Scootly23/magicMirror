angular.module('app').factory('mirrordata',initializeMirrorData);

function initializeMirrorData($http,$q){
    this.getCommuteData = function(lat,long){
        var deferred = $q.defer()
        $http({
            method: 'GET',
            url: '/commute?lat='+lat+'&long='+long
          }).then(function successCallback(response) {
              deferred.resolve(response);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
        return deferred.promise;
    }
    this.getWeatherData = function(lat,long){
        var deferred = $q.defer()
        $http({
            method: 'GET',
            url: '/weather?lat='+lat+'&long='+long
          }).then(function successCallback(response) {
              deferred.resolve(response);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
        return deferred.promise;
    }
    return this;
};