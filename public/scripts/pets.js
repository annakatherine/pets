console.log( 'js sourced ');

var myApp=angular.module( 'myApp', [] );

myApp.controller( 'petController', [ '$scope', '$http', function( $scope, $http ){
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

//------------------------------------------------------------------

      $http({
        method: 'GET',
        url: ('/getPet'),
      }).then(function (response) {
        $scope.petArray = response.data;
        console.log( 'in getPets call, $scope.petArray: '+ $scope.petArray );
      });
    };

    $scope.removeRow = function(index){
      console.log('deleted pet clicked ');
      $scope.petArray.splice( index, 1 );
        $http({
      method: 'DELETE',
      url: ('/deletePet'),
      // data: deletedPet
    }); //end http remove pet
  };//end of removePet function
}]); //end of controller
