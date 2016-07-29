// EXPORT EVERY FUNCTION CREATED HERE!

"use strict";

app.factory("SearchDatabaseFactory", function($q, $http){

//  getRestaurantList function goes here

  let getRestaurantList = (searchText) => {
      return $q(function(resolve, reject){
        $http.get(`http://api.v3.factual.com/t/restaurants-us?filters={"$and":[{"cuisine":{"$includes":"vegan"}}]}&KEY=OGnUmTnKEdWMoOCjiZjHbiXLShgS7WOzSX285RiR&q=${searchText}`)
          .success(function(returnObject){ 
            console.log("restaurants from DB", returnObject);
            resolve(returnObject);
          })
          .error(function(error){
        reject(error);
      });  
    }); 
  };

  return {getRestaurantList};
});