"use strict";

app.controller("FavoritesCtrl", function($scope, $routeParams, DatabaseFactory, AuthFactory, FirebaseURL) {

// MAKE ARRAY OF ALL FAVORITES WITH SAME ID AND ASSIGN IT TO VARIABLE FAVORITES
  $scope.favorites = [];


DatabaseFactory.getFavorites()
  .then(function(favorites) {
    console.log("favorites", favorites);
    $scope.favorites = favorites
})


// ADD COMMENT FUNCTION
$scope.addComment = function(inputComment) {
  console.log("inputComment", inputComment);
  DatabaseFactory.postComment(inputComment);
}




// DELETE COMMENT FUNCTION

// EDIT COMMENT FUNCTION

// REMOVE FAVORITE FUNCTION
  $scope.removeFavorite = function(removeId) {
    console.log("removing: ", removeId);
    DatabaseFactory.deleteFavorite(removeId)
      .then(function(){
        DatabaseFactory.getFavorites()
        .then (function(favorites){
          $scope.favorites = favorites;
        });
      });     
  };




});
