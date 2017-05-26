"use strict";angular.module("sunnyWeatherApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngStorage","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/current/:cityID",{templateUrl:"views/current.html",controller:"CurrentCtrl",controllerAs:"current"}).when("/forecast/:cityID",{templateUrl:"views/forecast.html",controller:"ForecastCtrl",controllerAs:"forecast"}).otherwise({redirectTo:"/"})}]),angular.module("sunnyWeatherApp").controller("MainCtrl",["$scope","citysearch","$localStorage",function(a,b,c){a.citiesFound=b.find(),a.storage=c,a.findCities=function(){a.citiesFound=b.find({query:a.location}),a.searchQuery=a.location}}]),angular.module("sunnyWeatherApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("sunnyWeatherApp").factory("current",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/weather?id=:cityID&units=imperial&APPID=260156459874096ef4f2b7fcb520a496",{},{query:{method:"GET",params:{cityID:"4717560"},isArray:!1}})}]),angular.module("sunnyWeatherApp").factory("citysearch",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/find?q=:query&type=like&mode=json&units=imperial&APPID=260156459874096ef4f2b7fcb520a496",{},{find:{method:"GET",params:{query:"seattle"},isArray:!1}})}]),angular.module("sunnyWeatherApp").controller("CurrentCtrl",["$scope","$routeParams","current","$localStorage",function(a,b,c,d){a.cityID=b.cityID,a.currentWeather=c.query({cityID:b.cityID}),a.saveCity=function(b){var c={name:b.name,id:b.id};if(d.savedCities){for(var e=!0,f=0;f<d.savedCities.length;f++)d.savedCities[f].id===c.id&&(e=!1);e===!0?(d.savedCities.push(c),a.citySaved={success:!0}):(console.log("city already saved"),a.citySaved={duplicate:!0})}else d.savedCities=[c]}}]),angular.module("sunnyWeatherApp").factory("forecast",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/forecast/daily?id=:cityID&cnt=16&units=imperial&APPID=260156459874096ef4f2b7fcb520a496",{},{query:{method:"GET",params:{cityID:"4717560"},isArray:!1}})}]),angular.module("sunnyWeatherApp").controller("ForecastCtrl",["$scope","$routeParams","forecast",function(a,b,c){a.cityID=b.cityID,a.forecastData=c.query({cityID:b.cityID})}]),angular.module("sunnyWeatherApp").run(["$templateCache",function(a){a.put("views/about.html","<p>A weather app assignment created for WATS4000 by Jiun Wang.</p>"),a.put("views/current.html",'<div ng-app class="jumbotron" ng-controller="MainCtrl"> <h1>Select Your City</h1> <p class="lead"> <div ng-init="location=\'Seattle\'"> <p> <label for="location">Location: <input type="text" name="location" ng-model="location"> </label> <button class="btn btn-md btn-primary" ng-click="findCities()">Find City</button> </p> </div> <div ng-if="searchQuery"> <p class="lead">{{citiesFound.count}} cities found matching the query: {{searchQuery}}.</p> <dl ng-repeat="city in citiesFound.list"> <dt>{{city.name}}, {{city.sys.country}}</dt> <dd>{{city.weather[0].main}} - {{city.weather[0].description}}</dd> <dt>Temperature</dt> <dd class="forecast-icon"><img src="http://openweathermap.org/img/w/{{city.weather[0].icon}}.png" alt="icon" style="width:100px;height:100px"></dd> <dd>{{city.main.temp}} &deg;F</dd> <dd><a ng-href="#!/current/{{city.id}}" class="btn btn-lg btn-primary">View Weather</a></dd> </dl> </div> </p> </div> <div ng-if="storage.savedCities"> <h2>Saved Cities</h2> <ul class="saved-cities-list"> <li ng-repeat="city in storage.savedCities"> <a ng-href="#!/current/{{city.id}}" class="btn btn-md btn-primary">{{city.name}}</a> </li> </ul> </div> <div class="current-container"> <h1>Current Weather for {{currentWeather.name}}</h1> <dl class="current-weather"> <dt>Currently</dt> <dd>{{currentWeather.weather[0].main}}</dd> <dd>{{currentWeather.weather[0].description}}</dd> <dt>Temperature</dt> <dd class="current-temp">{{currentWeather.main.temp}} &deg;F</dd> <dd class="forecast-icon"><img src="http://openweathermap.org/img/w/{{currentWeather.weather[0].icon}}.png" alt="icon" style="width:100px;height:100px"></dd> <dd class="max-temp">High: {{currentWeather.main.temp_max}} &deg;F</dd> <dd class="min-temp">Low: {{currentWeather.main.temp_min}} &deg;F</dd> <dt>Wind</dt> <dd>{{currentWeather.wind.speed}} mph at {{currentWeather.wind.deg}} &deg;</dd> <dt>Clouds</dt> <dd>{{currentWeather.clouds.all}}%</dd> </dl> <p><a ng-href="#!/forecast/{{cityID}}" class="btn btn-lg btn-primary">View 16-day Forecast</a></p> <p><button class="btn btn-sm btn-primary" ng-click="saveCity(currentWeather)">Save City</button></p> <div ng-messages="citySaved"> <p class="city-saved-alert bg-success text-success" ng-message="success"> {{currentWeather.name}} has been saved to your list of cities. </p> <p class="city-saved-alert bg-warning text-warning" ng-message="duplicate"> {{currentWeather.name}} has already been saved to your list of cities. </p> </div> </div>'),a.put("views/forecast.html",'<div class="forecast-container"> <h1>16-Day Forecast for {{forecastData.city.name}} {{forecastData.city.country}}</h1> <dl ng-repeat="prediction in forecastData.list" class="weather-forecast"> <div class="forecast-data"> <dt class="date">Forecast for {{prediction.dt*1000 | date:\'MMM dd, yyyy\'}}</dt> <dd class="forecast-icon"><img src="http://openweathermap.org/img/w/{{prediction.weather[0].icon}}.png" alt="icon" style="width:100px;height:100px"></dd> <dd>{{prediction.weather[0].main}}</dd> <dd>{{prediction.weather[0].description}}</dd> <dt>Temperature</dt> <dd class="max-temp">High: {{prediction.temp.max}} &deg;F</dd> <dd class="min-temp">Low: {{prediction.temp.min}} &deg;F </dd> </div> </dl> <p><a ng-href="#!/current/{{cityID}}" class="btn btn-lg btn-primary">View Current Weather</a></p> </div>'),a.put("views/main.html",'<div ng-app class="jumbotron" ng-controller="MainCtrl"> <h1>Select Your City</h1> <p class="lead"> <div ng-init="location=\'Seattle\'"> <p> <label for="location">Location: <input type="text" name="location" ng-model="location"> </label> <button class="btn btn-md btn-primary" ng-click="findCities()">Find City</button> </p> </div> <div ng-if="searchQuery"> <p class="lead">{{citiesFound.count}} cities found matching the query: {{searchQuery}}.</p> <dl ng-repeat="city in citiesFound.list"> <dt>{{city.name}}, {{city.sys.country}}</dt> <dd>{{city.weather[0].main}} - {{city.weather[0].description}}</dd> <dt>Temperature</dt> <dd class="forecast-icon"><img src="http://openweathermap.org/img/w/{{city.weather[0].icon}}.png" alt="icon" style="width:100px;height:100px"></dd> <dd>{{city.main.temp}} &deg;F</dd> <dd><a ng-href="#!/current/{{city.id}}" class="btn btn-lg btn-primary">View Weather</a></dd> </dl> </div> </p> </div> <div ng-if="storage.savedCities"> <h2>Saved Cities</h2> <ul class="saved-cities-list"> <li ng-repeat="city in storage.savedCities"> <a ng-href="#!/current/{{city.id}}" class="btn btn-md btn-primary">{{city.name}}</a> </li> </ul> </div>')}]);