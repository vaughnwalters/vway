"use strict";

app.factory("DatabaseFactory", function($q, $http, FirebaseURL, AuthFactory){


// *************************
// COMMENT IN TO USE FACTUAL API (also CitySearchCtrl):



  // let getRestaurantList = (searchText) => {
  //   let restaurantArray = []
  //   let returnObjArray = null;

  //     return $q(function(resolve, reject){
  //       $http.get(`http://api.v3.factual.com/t/restaurants-us?filters={"$and":[{"cuisine":{"$includes":"vegan"}}]}&KEY=OGnUmTnKEdWMoOCjiZjHbiXLShgS7WOzSX285RiR&q=${searchText}`
  //         )



// Why isn't returnObjArray[i] working after the "then statement"


// COMMENT IN FOR NASHVILLE TEST DATA (also CitySearchCtrl):
  let getRestaurantList = () => {
      let returnObjArray = null;
      return $q(function(resolve, reject){
        $http.get(`nashvilleFactualResponse.json`)
// *************************
          .success(function(returnObject){ 
            // push each item into array - will be an object with keyvalue pair 
            returnObjArray = returnObject.response.data;
            let restaurantArray = [];
            for (var i = 0; i < returnObjArray.length; i++) {
  // add IIFE closure to keep i scoped to entire for loop, including then statement            
              (function(i){
                getPhotoReference(returnObjArray[i].latitude, returnObjArray[i].longitude, returnObjArray[i].name)
                .then(function(returnFromPlacesCall) {
  // if photoReference exists then do this, else use dat avocado picture
                  // if (returnFromPlacesCall.results[0].photos[0].photo_reference) {
                  var photoReference = returnFromPlacesCall.results[0].photos[0].photo_reference;
                  returnObjArray[i].photoReference = photoReference;
                  restaurantArray.push(returnObjArray[i]);
                  // } else {
                  //   console.log("AVOCADO PICTURE INSTEAD");

                  // }
                })
                  console.log("restaurantArray", restaurantArray);
              })(i);
            };
            resolve(restaurantArray);
            // resolve the restaurantArray instead of returnobject
          })
          .error(function(error){
        reject(error);
      });  
    }); 
  };








// *************************
  let getPhotoReference = (latitude, longitude, name) => {
    // console.log(latitude, longitude, name);

      return $q(function(resolve, reject){
        

        // COMMENT IN FOR GOOGLE PLACES API DATA
        // $http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type&name=${name}&key=AIzaSyAyWCfgRqpl3Uh8wX4D4nA-zmfQVZYCHek`)

        // COMMENT IN FOR nashvilleGooglePlacesResponse.json
        $http.get(`nashvilleGooglePlacesResponse.json`)


          .success(function(returnObject){ 
            resolve(returnObject);
          })
          .error(function(error){
        reject(error);
      });  
    }); 
  };





// let getPhoto = function() {

// }




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






// DELETE FAVORITE FUNCTION

  let deleteFavorite = function(removeId){
    let boardUrl = FirebaseURL + "/favorites/" + removeId + ".json";
    return $q(function(resolve, reject){
      $http.delete(boardUrl)
        .success(function(){
          resolve();
        });
    });
  };




// FOR THE LOVE OF GOD VAUGHN, REMEMBER TO EXPORT THESE FUNCTIONS

  return {getRestaurantList, postNewFavorite, getFavorites, deleteFavorite, postComment};
});