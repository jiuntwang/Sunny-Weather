'use strict';

/**
 * @ngdoc function
 * @name sunnyWeatherApp.controller:ForecastCtrl
 * @description
 * # ForecastCtrl
 * Controller of the sunnyWeatherApp
 */
angular.module('sunnyWeatherApp')
.controller('ForecastCtrl', function ($scope, $routeParams, forecast) {
    $scope.cityID = $routeParams.cityID;

    $scope.forecastData = forecast.query({
        cityID: $routeParams.cityID
    });
  });
