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


// Calls factual (also uses DatabaseFactory.js):
  $scope.searchDatabase = function (cityToSearch) {
    DatabaseFactory.getRestaurantList(cityToSearch)
    .then(function(dataFromResolve) {
      $scope.restaurants = dataFromResolve;
    });  
  };


// To change heart to full
  $scope.activateFavoriteMode = function(restaurant) {
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


  $scope.favoriteAddedToast = function(restaurantName) {
    Materialize.toast(restaurantName + " added to favorites", 1500);
  };

  
});
