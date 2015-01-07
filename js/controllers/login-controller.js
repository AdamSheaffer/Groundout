;(function() {
  "use strict";

  angular.module('myApp')

  .controller('loginController', function($rootScope, $scope, $location, authFactory){
    var vm = this;

    $rootScope.page = function() {
      switch($location.$$path){
        case "/login":
          return "Login"
          break;
        case "/changepassword":
          return "Change Password"
          break;
        case "teams":
          return "Teams"
          break;
        case "myprogress":
          return "My Progress"
          break;
      }
    }

    vm.login = function(){
      authFactory.login(vm.email, vm.password, function(){
        $location.path('/myprogress');
        $scope.$apply();
      });
    }

    vm.register = function(){
      authFactory.register(vm.email, vm.password, function(){
        vm.login();
      });
    }

    vm.forgotPassword = function() {
      authFactory.forgotPassword(vm.email, function(){
        $location.path('/changepassword');
        $scope.$apply();
      });
    }

    vm.changePassword = function() {
      authFactory.changePassword(vm.email, vm.oldPassword, vm.newPassword, function(){
        $location.path('/');
        $scope.$apply();
      });
    }

    vm.closeAlert = function() {
      $('.alert').hide('drop');
    }

  })

}());
