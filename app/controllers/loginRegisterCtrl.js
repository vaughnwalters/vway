"use strict";

app.controller("LoginRegisterCtrl", function ($scope, $location, AuthFactory) {

  $scope.loginData = {
    email: "",
    password: ""
  };

  $scope.registerData = {
    email: "",
    password: ""
  };

  // register function

  $scope.registerEmail = function() {
    firebase.auth().createUserWithEmailAndPassword($scope.registerData.email, $scope.registerData.password)
    .then(function(user) {
      console.log("LOGIN", user.uid);
      $location.path("/citySearch");
      $scope.$apply();
    });
  }

  // login function

  $scope.loginEmail = function() {
    firebase.auth().signOut();
    firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password)
    .then(function() {
      $location.path("/citySearch");
      $scope.$apply();
    });
  }


  $scope.loginGoogle = function() {
    firebase.auth().signOut();
    AuthFactory.authWithProvider()
    .then(function(result) {
      console.log(result);
      // var user = result.user.uid;
      // console.log("AND THE LOGGED USER IS...", user.uid);
      $location.url("/citySearch");
      $scope.$apply();
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