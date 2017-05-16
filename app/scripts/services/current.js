'use strict';

/**
 * @ngdoc service
 * @name sunnyWeatherApp.current
 * @description
 * # current
 * Factory in the sunnyWeatherApp.
 */
angular.module('sunnyWeatherApp')
  .factory('current', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource('http://api.openweathermap.org/data/2.5/weather?q=:location&units=imperial&APPID=260156459874096ef4f2b7fcb520a496', {}, {
      query: {
        method:'GET',
        params:{
          cityID: '4717560' // Paris, France ID
        },
        isArray:false
      }
    });
  });