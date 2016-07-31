"use strict";

app.factory("DatabaseFactory", function($q, $http, FirebaseURL, AuthFactory){


// *************************
// COMMENT IN TO USE FACTUAL API (also CitySearchCtrl):
  // let getRestaurantList = (searchText) => {
  //     return $q(function(resolve, reject){
        // $http.get(`http://api.v3.factual.com/t/restaurants-us?filters={"$and":[{"cuisine":{"$includes":"vegan"}}]}&KEY=OGnUmTnKEdWMoOCjiZjHbiXLShgS7WOzSX285RiR&q=${searchText}`
        //   )

// COMMENT IN FOR NASHVILLE TEST DATA (also CitySearchCtrl):
  let getRestaurantList = (searchText) => {
      return $q(function(resolve, reject){
        $http.get(`nashvilleFactualResponse.json`)
// *************************
          .success(function(returnObject){ 
            console.log("restaurants from DB", returnObject);
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
    console.log("newComment", newComment);
    return $q(function(resolve, reject){

      $http.patch(`${FirebaseURL}/favorites/${favoriteId}.json`, { "comment": "this is the comment that i want" });
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