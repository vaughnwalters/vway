"use strict";

app.controller("NavCtrl", function ($scope, AuthFactory, $location) {
  
$(document).ready(function(){
  $(".button-collapse").sideNav();
});


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

