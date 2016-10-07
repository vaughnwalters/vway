"use strict";

app.controller("NavCtrl", function ($scope, AuthFactory, DatabaseFactory, $routeParams, $location) {
  
  $(document).ready(function(){
    $(".button-collapse").sideNav(
      {
        closeOnClick: true
    })
  });


  $scope.restaurants = [];
  

  $scope.searchDatabase = function (cityToSearch) {
    DatabaseFactory.getRestaurantList(cityToSearch)
    .then(function(dataFromResolve) {
      $scope.restaurants = dataFromResolve;
    });  
  };


  // get Id of user and log out
  $scope.logout = function() {
    let currentUserId = AuthFactory.getUser();
    firebase.auth().signOut()
    .then(function() {
      currentUserId = AuthFactory.logout();
      $location.url("/");
      $scope.$apply();
    });
  };
  

});

