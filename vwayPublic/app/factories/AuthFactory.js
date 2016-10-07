"use strict";

app.factory("AuthFactory", function() {

  let currentUserId = null;
  let provider = new firebase.auth.GoogleAuthProvider();

// log in user
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUserId = user.uid;
    }
    else {
      // console.log("User not logged in");
    }
  });

  let authWithProvider = function() {
    return firebase.auth().signInWithPopup(provider);
  };

  let isAuthenticated = function() {
    return (currentUserId) ? true : false;
  };

  let getUser = function() {
    return currentUserId;
  };

  let logout = function() {
    currentUserId = null;
    return currentUserId;
  };

  return {authWithProvider, isAuthenticated, getUser, logout};

});
