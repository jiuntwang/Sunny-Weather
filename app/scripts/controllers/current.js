'use strict';

/**
 * @ngdoc function
 * @name sunnyWeatherApp.controller:CurrentCtrl
 * @description
 * # CurrentCtrl
 * Controller of the sunnyWeatherApp
 */
angular.module('sunnyWeatherApp')
 .controller('CurrentCtrl', function ($scope, $routeParams, current, $localStorage) {
    $scope.cityID = $routeParams.cityID;

    $scope.currentWeather = current.query({
        cityID: $routeParams.cityID
    });

$scope.saveCity = function(city){
    var cityData = {
        'name': city.name,
        'id': city.id
    };
    if (!$localStorage.savedCities){
        $localStorage.savedCities = [cityData];
    } else {
        // Check to make sure we haven't already saved the city.
        var save = true;
        for (var i=0; i < $localStorage.savedCities.length; i++){
            if ($localStorage.savedCities[i].id === cityData.id) {
                // this is a duplicate, so don't save
                save = false;
            }
        }
        if (save===true){
            $localStorage.savedCities.push(cityData);
            // Add object to trigger messages
            $scope.citySaved = {
                'success': true
            };
        } else {
            console.log('city already saved');
            // Add object to trigger messages
            $scope.citySaved = {
                'duplicate': true
            };
        }
    }
};

  });