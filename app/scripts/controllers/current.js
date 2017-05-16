'use strict';

/**
 * @ngdoc function
 * @name sunnyWeatherApp.controller:CurrentCtrl
 * @description
 * # CurrentCtrl
 * Controller of the sunnyWeatherApp
 */
angular.module('sunnyWeatherApp')
 .controller('CurrentCtrl', function ($scope, $routeParams, current) {
    $scope.cityID = $routeParams.cityID;

    $scope.currentWeather = current.query({
        cityID: $routeParams.cityID
    });
  });