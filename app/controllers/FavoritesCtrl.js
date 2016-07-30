"use strict";


app.controller("FavoritesCtrl", function($scope, $routeParams, DatabaseFactory, AuthFactory, FirebaseURL) {

// MAKE ARRAY OF ALL FAVORITES WITH SAME ID AND ASSIGN IT TO VARIABLE FAVORITES

DatabaseFactory.getFavorites()
  .then(function(favorites) {
    console.log("favorites", favorites);
    $scope.favorites = favorites
  })


});
