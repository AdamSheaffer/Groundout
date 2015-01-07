(function() {
  "use strict";

  angular.module('myApp')

    .controller('logoutController', function($scope, $location, $rootScope){
      var ref = new Firebase('https://groundout.firebaseio.com/');
      ref.unauth(function(){
        $location.path('/');
        $rootScope.user = null;
        $scope.$apply();
      })
    })

}());
