"use strict";

app.controller("NavCtrl", function ($scope, AuthFactory, DatabaseFactory, $routeParams, $location) {
  
$(document).ready(function(){
  $(".button-collapse").sideNav(
    {
      closeOnClick: true
  })
});

  $scope.restaurants = [];



// *******************************
// COMMENT IN FOR USING FACTUAL (also DatabaseFactory.js):
  // $scope.searchDatabase = function (cityToSearch) {
  //   DatabaseFactory.getRestaurantList(cityToSearch)
    
// COMMENT IN FOR NASHVILLE TEST DATA (also DatabaseFactory.js):
  $scope.searchDatabase = function () {
    DatabaseFactory.getRestaurantList()
// ******************************
    .then(function(dataFromResolve) {
      $scope.restaurants = dataFromResolve;
      console.log("restaurants", $scope.restaurants);
    });  
  };



  $scope.logout = function() {
    console.log("YO");
    let currentUserId = AuthFactory.getUser();
    console.log("currentUserId", currentUserId);
    firebase.auth().signOut()
    .then(function() {
      console.log("log out called");
      currentUserId = AuthFactory.logout();
      $location.url("/");
      $scope.$apply();
      console.log("currentUserId", currentUserId);
    });
  };
  
});

