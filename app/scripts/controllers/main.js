'use strict';

/**
 * @ngdoc function
 * @name sunnyWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sunnyWeatherApp
 */
angular.module('sunnyWeatherApp')
 .controller('MainCtrl', function ($scope, citysearch, $localStorage) {
    $scope.citiesFound = citysearch.find();
    $scope.storage = $localStorage;

    $scope.findCities = function(){
        $scope.citiesFound = citysearch.find({
            query: $scope.location
        });
        $scope.searchQuery = $scope.location;
    };
  });