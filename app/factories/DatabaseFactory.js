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



  let getFavorites = function() {
    let favorites = [];
    return $q(function(resolve, reject) {
      console.log("user id?", AuthFactory.getUser());
      $http.get(`${FirebaseURL}/favorites.json?orderBy="uid"&equalTo="${AuthFactory.getUser()}"`)
      .success(function(favoritesObj) {
        // console.log("favoritesObj", favoritesObj);
        //create array from object and loop thru keys to push each board to the favorites array
        Object.keys(favoritesObj).forEach(function(key){
          favorites.push(favoritesObj[key]);
        });
        // console.log("favorites:", favorites);
        resolve (favorites);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };


// FOR THE LOVE OF GOD VAUGHN, REMEMBER TO EXPORT THESE FUNCTIONS

  return {getRestaurantList, postNewFavorite, getFavorites};
});