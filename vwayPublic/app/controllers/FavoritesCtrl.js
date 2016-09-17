"use strict";

app.controller("FavoritesCtrl", function($scope, $routeParams, DatabaseFactory, AuthFactory, FirebaseURL) {

// MAKE ARRAY OF ALL FAVORITES WITH SAME ID AND ASSIGN IT TO VARIABLE FAVORITES
$scope.favorites = [];


DatabaseFactory.getFavorites()
  .then(function(favorites) {
    console.log("favorites", favorites);
    $scope.favorites = favorites;
});


// ADD COMMENT FUNCTION
$scope.addComment = function(inputComment, favoriteId) {
  console.log("inputComment", inputComment);
  console.log("favoriteId", favoriteId);
  DatabaseFactory.postComment(inputComment, favoriteId);
};


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

  // REMOVE FAVORITE TOAST
  $scope.removeFavoriteToast = function(restaurantName) {
    Materialize.toast(restaurantName + " was removed from your favorites", 1500);
  };

  $scope.addCommentToast = function () {
    Materialize.toast("comment saved!", 1000);
  }

});
