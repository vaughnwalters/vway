"use strict";

app.factory("DatabaseFactory", function($q, $http, FirebaseURL, AuthFactory, GoogleCreds, FactualCreds){


// *************************
// COMMENT IN TO USE FACTUAL API (also CitySearchCtrl):
  // let getRestaurantList = (searchText) => {
  //   console.log("FactualApi", FactualCreds.apiKey);
  //   let restaurantArray = []
  //   let returnObjArray = null;
  //   let count = 0;
  //     return $q(function(resolve, reject){
  //       $http.get(`http://api.v3.factual.com/t/restaurants-us?filters={"$and":[{"cuisine":{"$includes":"vegan"}}]}&KEY=${FactualCreds.apiKey}&q=${searchText}`
  //       )


// COMMENT IN FOR NASHVILLE TEST DATA (also CitySearchCtrl):
    let getRestaurantList = () => { 
        let returnObjArray = null;
        let restaurantArray = [];
        // let count = 0;
        return $q(function(resolve, reject){
          $http.get(`nashvilleFactualResponse.json`)
// *************************
        .success(function(returnObject){ 
          // push each item into array - will be an object with keyvalue pair 
          returnObjArray = returnObject.response.data;
          for (var i = 0; i < returnObjArray.length; i++) {
            (function (i) { 
              getPhotoReference(returnObjArray[i].latitude, returnObjArray[i].longitude, returnObjArray[i].name)
              .then(function(returnFromPlacesCall) {
                console.log("<<<", returnFromPlacesCall);
                if (returnFromPlacesCall.results[0].photos) {
                  let photoReference = returnFromPlacesCall.results[0].photos[0].photo_reference;
                  let photoPath = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GoogleCreds.apiKey}`
                  returnObjArray[i].photoPath = photoPath;
                } else {
                  // console.log("AVOCADO PICTURE INSTEAD");
                  returnObjArray[i].photoPath = `images/avocado.png`
                }
                // count++;
                restaurantArray.push(returnObjArray[i]);
                resolve(restaurantArray);
              })
            })(i)
          };
        })
        .error(function(error){
          reject(error);
      });  
    }); 
  };


// HELPER FUNCTION FOR getRestaurantList
  let getPhotoReference = (latitude, longitude, name) => {
      return $q(function(resolve, reject){
        $http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type&name=${name}&key=${GoogleCreds.apiKey}`)
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
        console.log("FROM FIREBASE: ", ObjFromFirebase );
        let newFavoriteId = ObjFromFirebase.name;
        newFavorite.favoriteId = newFavoriteId;
        $http.patch(`${FirebaseURL}/favorites/${newFavoriteId}.json`, newFavorite);
      });
    });
  };


  let postComment = function(newComment, favoriteId) {
    console.log("newComment", newComment);
    return $q(function(resolve, reject){
      $http.patch(`${FirebaseURL}/favorites/${favoriteId}.json`,{ "comment": newComment});
    });
  };


  let getFavorites = function() {
    let favorites = [];
    return $q(function(resolve, reject) {
      console.log("user id?", AuthFactory.getUser());
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