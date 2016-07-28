"use strict";

var app = angular.module("vway", ["ngRoute"])
.constant("FirebaseURL", "https://vway-7b92e.firebaseio.com");


app.config(function($routeProvider, FBCreds) {
  let authConfig = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain
  };
  firebase.initializeApp(authConfig);
  console.log('HELLO')

  $routeProvider
    .when('/', {
      templateUrl: "partials/loginRegister.html",
      controller: "loginRegisterCtrl"
    })
    .otherwise('/');
});
