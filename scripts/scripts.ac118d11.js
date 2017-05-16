"use strict";angular.module("sunnyWeatherApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/current/:cityID",{templateUrl:"views/current.html",controller:"CurrentCtrl",controllerAs:"current"}).otherwise({redirectTo:"/"})}]),angular.module("sunnyWeatherApp").controller("MainCtrl",["$scope","citysearch",function(a,b){a.citiesFound=b.find(),a.findCities=function(){a.citiesFound=b.find({query:a.location}),a.searchQuery=a.location}}]),angular.module("sunnyWeatherApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("sunnyWeatherApp").factory("current",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/weather?q=:location&units=imperial&APPID=260156459874096ef4f2b7fcb520a496",{},{query:{method:"GET",params:{cityID:"4717560"},isArray:!1}})}]),angular.module("sunnyWeatherApp").factory("citysearch",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/find?q=:query&type=like&mode=json&APPID=260156459874096ef4f2b7fcb520a496",{},{find:{method:"GET",params:{query:"seattle"},isArray:!1}})}]),angular.module("sunnyWeatherApp").controller("CurrentCtrl",["$scope","$routeParams","current",function(a,b,c){a.cityID=b.cityID,a.currentWeather=c.query({cityID:b.cityID})}]),angular.module("sunnyWeatherApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/current.html",'<h1>Current Weather for {{currentWeather.name}}</h1> <dl> <dt>Currently</dt> <dd>{{currentWeather.weather[0].main}}</dd> <dd>{{currentWeather.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{currentWeather.main.temp}} &deg;F</dd> <dt>Wind</dt> <dd>{{currentWeather.wind.speed}} mph at {{currentWeather.wind.deg}} &deg;</dd> <dt>Clouds</dt> <dd>{{currentWeather.clouds.all}}%</dd> </dl> <p><a ng-href="/#!/forecast/{{cityID}}" class="btn btn-lg btn-primary">View 16-day Forecast</a></p>'),a.put("views/main.html",'<div ng-app class="jumbotron" ng-controller="MainCtrl"> <h1>Select Your City</h1> <p class="lead"> <div ng-init="location=\'Seattle\'"> <p> <label for="location">Location: <input type="text" name="location" ng-model="location"> </label> </p> <p> <button class="btn btn-lg btn-primary" ng-click="findCities()">Find City</button> </p> </div> <div ng-if="searchQuery"> <p class="lead">{{citiesFound.count}} cities found matching the query: {{searchQuery}}.</p> <dl ng-repeat="city in citiesFound.list"> <dt>{{city.name}}, {{city.sys.country}}</dt> <dd>{{city.weather[0].main}} - {{city.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{city.main.temp}} &deg;F</dd> <dd><a ng-href="/#!/current/{{city.id}}" class="btn btn-lg btn-primary">View Weather</a></dd> </dl> </div> </p> </div>')}]);