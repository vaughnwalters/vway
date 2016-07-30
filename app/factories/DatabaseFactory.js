"use strict";

app.factory("DatabaseFactory", function($q, $http, FirebaseURL){


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
      // why are all these ObjFromFirebase the same name?
      .success(function(ObjFromFirebase){
        let newFavoriteId = ObjFromFirebase.name;
        newFavorite.favoriteId = newFavoriteId;
        $http.put(`${FirebaseURL}/favorites/${newFavoriteId}.json`, newFavorite);
      });
    });
  };


// FOR THE LOVE OF GOD VAUGHN, REMEMBER TO EXPORT THESE FUNCTIONS

  return {getRestaurantList, postNewFavorite};
});