"use strict";

app.controller("CitySearchCtrl", function($scope, $routeParams, DatabaseFactory, AuthFactory) {



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

// make a function that loops through dataFromResolve and parses it to just key value pairs i need then push to array 


      $scope.restaurants = dataFromResolve.response.data;
    });
  }



  $scope.newFavorite = {
    "name": "",
    "address": "",
    "locality": "",
    "region": "",
    "tel": "",
    "website": "",
    "uid": "",
    "favoriteId": ""
  }




  $scope.addToFavorites = function(restaurant) {
    $scope.newFavorite.uid = AuthFactory.getUser();
    $scope.newFavorite.name = restaurant.name;
    $scope.newFavorite.address = restaurant.address;
    $scope.newFavorite.locality = restaurant.locality;
    $scope.newFavorite.region = restaurant.region;
    $scope.newFavorite.tel = restaurant.tel;
    $scope.newFavorite.website = restaurant.website;
    DatabaseFactory.postNewFavorite($scope.newFavorite);



    console.log($scope.newFavorite);
  }





});
