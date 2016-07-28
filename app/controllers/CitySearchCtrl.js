"use strict";

app.controller("CitySearchCtrl", function($scope, $routeParams, AuthFactory) {


  $scope.logout = function() {
    let currentUserId = AuthFactory.getUser();
    console.log("currentUserId", currentUserId);
    firebase.auth().signOut()
    .then(function() {
      console.log("log out called");
      currentUserId = AuthFactory.logout();
      $location.url("/");
      $scope.$apply();
      console.log("currentUserId", currentUserId);
    })
  };




});
