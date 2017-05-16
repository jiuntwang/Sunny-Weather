'use strict';

/**
 * @ngdoc function
 * @name sunnyWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sunnyWeatherApp
 */
angular.module('sunnyWeatherApp')
 .controller('MainCtrl', function ($scope, citysearch) {
    $scope.citiesFound = citysearch.find();

    $scope.findCities = function(){
        $scope.citiesFound = citysearch.find({
            query: $scope.location
        });
        $scope.searchQuery = $scope.location;
    };
  });