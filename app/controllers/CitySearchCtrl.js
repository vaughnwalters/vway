"use strict";

app.controller("CitySearchCtrl", function($scope, $routeParams, SearchDatabaseFactory) {

  $scope.restaurants = [];


  $scope.searchDatabase = function (cityToSearch) {
    SearchDatabaseFactory.getRestaurantList(cityToSearch)
    .then(function(dataFromResolve) {
      console.log("in the controller I see movie data...", dataFromResolve);
      $scope.restaurants = dataFromResolve.response.data;
      console.log("$scope.restaurants", $scope.restaurants);
    });
  }


});
