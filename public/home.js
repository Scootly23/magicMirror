angular.module('app').component('home',{
    templateUrl: '/public/home.html',
    controllerAs: 'vm',
    controller: homeController
});

function homeController($scope,$timeout,mirrordata)
{
    var vm = this;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            vm.lat= position.coords.latitude,
            vm.long= position.coords.longitude
            getWeatherData();
            getCommuteData();
        });
    }
    var getCommuteData = function()
    {
        mirrordata.getCommuteData(vm.lat,vm.long).then(function(res){
            vm.commuteTime = res.data.substring(0,2);
        });
        var currentHour = new Date().getHours();
        if(currentHour > 5 && currentHour < 9)
            var timeout = 30000;
        else
            var timeout = 1800000;
            
        $timeout(getCommuteData,timeout);
    }
    var getWeatherData = function()
    {
        mirrordata.getWeatherData(vm.lat,vm.long).then(function(res){
            vm.temperature = res.data.temperature;
            vm.location = res.data.location;
            getWeatherIcon(res.data.description)
        })
        $timeout(getWeatherData,1800000);
    }
    var tick = function()
    {
        vm.currentTime = Date.now();
        $timeout(tick, 1000);
    }
    $timeout(tick, 1000);
    var getWeatherIcon=function(condition)
    {
        switch(condition)
        {
            case 'clear' && new Date().getHours()>=18:
                vm.weatherIcon= 'wi wi-night-clear';
                break;
            case 'Mostly Sunny':
                vm.weatherIcon='wi wi-day-sunny-overcast';
                break;
            case 'Sunny':
                vm.weatherIcon='wi wi-day-sunny';
                break;
            case 'rain':
                vm.weatherIcon='wi wi-rain';
                break;
            case 'snow':
                vm.weatherIcon='wi wi-snow';
                break;
            case 'cloudy':
                vm.weahterIcon='wi wi-cloud';
                break;
            default:
                vm.weatherIcon='wi wi-meteor';
                console.log(condition.includes('Sunny'));
                console.log(new Date().getHours());
                break;
        }

    }
}