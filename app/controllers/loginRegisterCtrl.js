"use strict";

app.controller("loginRegisterCtrl", function ($scope, $location, AuthFactory) {


  $scope.loginGoogle = function() {
    AuthFactory.authWithProvider()
    .then(function(result) {
      console.log("yo");
      // var user = result.user.uid;
      console.log("AND THE LOGGED IN USER IS...", user.uid);
//!!!CHANGE THIS LOCATION PATH      
      // $location.path("/items/list");
      // $scope.$apply();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
});  