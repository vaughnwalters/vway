"use strict";

app.controller("CitySearchCtrl", function($scope, $routeParams, DatabaseFactory, AuthFactory) {

  $scope.restaurants = [];

  $scope.newFavorite = {
    "name": "",
    "address": "",
    "locality": "",
    "region": "",
    "tel": "",
    "website": "",
    "uid": "",
    "favoriteId": "",
    "comment" : "",
    "latitude": "",
    "longitude": "", 
    "photoPath": ""
  };

// add this search to the navbar


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



// To change heart to full

  // $scope.favoriteMode = false;

  $scope.activateFavoriteMode = function(restaurant) {
    // $scope.favoriteMode = true;
    restaurant.isFavorite = true;
  };




  $scope.addToFavorites = function(restaurant) {
    $scope.newFavorite = {
      uid: AuthFactory.getUser(),
      name: restaurant.name,
      address: restaurant.address,
      locality: restaurant.locality,
      region: restaurant.region,
      tel: restaurant.tel,
      website: restaurant.website,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      photoPath: restaurant.photoPath  
    }
    DatabaseFactory.postNewFavorite($scope.newFavorite);
  };

  $scope.toastAlert = function(restaurantName) {
    Materialize.toast(restaurantName + " added to favorites", 1500);
  };

});
