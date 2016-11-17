"use strict";

app.factory("DatabaseFactory", function($q, $http, FirebaseURL, AuthFactory, GoogleCreds, FactualCreds){

  let getRestaurantList = (searchText) => {
   // adding active class to spinner
   let spinnerDiv = angular.element('.search-spinner');
   spinnerDiv.addClass('active');

    let restaurantArray = []
    let returnObjArray = null;
    let count = 0;
    return $q(function(resolve, reject){
       $http.get(`https://vwayfactualproxy.herokuapp.com/t/restaurants-us?filters={"$and":[{"cuisine":{"$includes":"vegan"}}]}&q=${searchText}`)

        .success(function(returnObject){ 
          // push each item into array - will be an object with keyvalue pair 
          returnObjArray = returnObject.data;
          for (var i = 0; i < returnObjArray.length; i++) {
            (function (i) { 
              getPhotoReference(returnObjArray[i].latitude, returnObjArray[i].longitude, returnObjArray[i].name)
              .then(function(returnFromPlacesCall) {
                if (returnFromPlacesCall.results[0].photos) {
                  let photoReference = returnFromPlacesCall.results[0].photos[0].photo_reference;
                  let photoPath = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GoogleCreds.apiKey}`
                  returnObjArray[i].photoPath = photoPath;
                } else {
                  // AVOCADO PICTURE INSTEAD
                  returnObjArray[i].photoPath =  `images/avocado.png`
                }
                // set favorite to false for heart icon
                returnObjArray[i].isFavorite = false;
                restaurantArray.push(returnObjArray[i]);
                resolve(restaurantArray);
              })
            })(i)
          };
          // remove spinner class
          spinnerDiv.removeClass('active');
        })
        .error(function(error){
          reject(error);
      });  
    }); 
  };


// HELPER FUNCTION FOR getRestaurantList
  let getPhotoReference = (latitude, longitude, name) => {
      return $q(function(resolve, reject){
        $http.get(`https://vwayfactualproxy.herokuapp.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type&name=${name}&key=${GoogleCreds.apiKey}`)

          .success(function(returnObject){ 
            resolve(returnObject);
          })
          .error(function(error){
        reject(error);
      });  
    }); 
  };


  let postNewFavorite = (newFavorite) => {
    return $q(function(resolve, reject){
      $http.post(`${FirebaseURL}/favorites.json`,
       JSON.stringify(newFavorite))
      .success(function(ObjFromFirebase){
        let newFavoriteId = ObjFromFirebase.name;
        newFavorite.favoriteId = newFavoriteId;
        $http.patch(`${FirebaseURL}/favorites/${newFavoriteId}.json`, newFavorite);
      });
    });
  };


  let postComment = function(newComment, favoriteId) {
    return $q(function(resolve, reject){
      $http.patch(`${FirebaseURL}/favorites/${favoriteId}.json`,{ "comment": newComment});
    });
  };


  let getFavorites = function() {
    let favorites = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/favorites.json?orderBy="uid"&equalTo="${AuthFactory.getUser()}"`)
      .success(function(favoritesObj) {
      //create array from object and loop thru keys to push each favorite to the favorites array
        Object.keys(favoritesObj).forEach(function(key){
          favorites.push(favoritesObj[key]);
        });
        resolve (favorites);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };


  let deleteFavorite = function(removeId){
    let boardUrl = FirebaseURL + "/favorites/" + removeId + ".json";
    return $q(function(resolve, reject){
      $http.delete(boardUrl)
        .success(function(){
          resolve();
        });
    });
  };


  return {getRestaurantList, postNewFavorite, getFavorites, deleteFavorite, postComment};
});
