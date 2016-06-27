console.log( 'js sourced ');
var myApp=angular.module( 'myApp', [] );
myApp.controller( 'petController', [ '$scope', '$http', function( $scope, $http ){
  event.preventDefault();

        var loadAnimals = function(){ $http({
              method: 'GET',
              url: ('/getPet'),
            }).then(function (response) {
              $scope.petArray = response.data;
              console.log( 'in getPets call, $scope.petArray: '+ $scope.petArray );
            });
        };//end loadAnimals
        loadAnimals();
//set empty array to be filled by
  $scope.petArray = [];
  // get user input on button click
    $scope.addPet = function(){
      console.log( 'addPet clicked' );
      event.preventDefault();

      var petObject = {
        name: $scope.name,
        animal: $scope.animal,
        age: Number($scope.age),
        url: $scope.url,
      };
      console.log( petObject );
      $http({
        method: 'POST',
        url: ('/postPet'),
        data: petObject
      });
      //end of htt post call
      $scope.name='';
      $scope.animal='';
      $scope.age='';
      $scope.url='';
      loadAnimals();

//------------------------------------------------------------------

    $scope.removeRow = function(index){
      event.preventDefault();
      var petToDelete = $scope.petArray[index];
      console.log('deleted pet clicked ');
      $scope.petArray.splice( index, 1 );
      var petId = { id: petToDelete._id };
      console.log( 'petId: ' + petId.id );
        $http({
      method: 'POST',
      url: ('/deletePet'),
      data: petId
    }); //end http remove pet
   };//end of removePet function
  };
}]); //end of petController
