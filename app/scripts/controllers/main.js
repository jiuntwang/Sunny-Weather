'use strict';

/**
 * @ngdoc function
 * @name sunnyWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sunnyWeatherApp
 */
angular.module('sunnyWeatherApp')
  .controller('MainCtrl', function ($scope, current) {
    $scope.current = current.query();
    
    $scope.refreshCurrent = function(){
        $scope.current = current.query({
            location: $scope.location
        });
    };
  });