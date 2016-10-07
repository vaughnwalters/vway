"use strict";

var app = angular.module("vway", ["ngRoute"])
.constant("FirebaseURL", "https://vway-aff34.firebaseio.com");


app.config(function($routeProvider, FBCreds) {
  let authConfig = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain
  };
  firebase.initializeApp(authConfig);


  $routeProvider
    .when('/', {
      templateUrl: "partials/loginRegister.html",
      controller: "LoginRegisterCtrl"
    })
    .when('/citySearch', {
      templateUrl: "partials/citySearch.html",
      controller: "CitySearchCtrl"
    })
    .when('/favorites', {
      templateUrl: "partials/favorites.html",
      controller: "FavoritesCtrl"
    })
    .otherwise('/');


});
