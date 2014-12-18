(function() {
  'use strict';

  angular.module('myApp', ['ngRoute'])

  /////// CONSTANTS //////////
    .constant('FirebaseURL', 'https://groundout.firebaseio.com/')

    /////// FACTORY //////////
    .factory('authFactory', function(FirebaseURL, $http, $location, $rootScope){
      var factory = {},
        ref = new Firebase(FirebaseURL);

      $rootScope.user = ref.getAuth();

      function isLoggedIn(){
        return !!(ref.getAuth());
      };

      factory.requireLogin = function(){
        if (!isLoggedIn()) {
          $location.path('/login');
        }
      };

      factory.preventMultiLogin = function(){
        if(isLoggedIn()) {
          $location.path('/myprogress');
        }
      }

      factory.login = function(userEmail, userPassword, cb){
        ref.authWithPassword({
          email    : userEmail,
          password : userPassword
        }, function(error, authData) {
          if (error) {
            switch (error.code) {
              case "INVALID_EMAIL":
                console.log("The specified user account email is invalid.");
                break;
              case "INVALID_PASSWORD":
                console.log("The specified user account password is incorrect.");
                break;
              case "INVALID_USER":
                console.log("The specified user account does not exist.");
                break;
              default:
                console.log("Error logging user in:", error);
            }
          } else {
              console.log("Authenticated successfully with payload:", authData);
              $rootScope.user = authData;
              cb();
          }
        });
      }

      factory.register = function(userEmail, userPassword, cb){
        ref.createUser({
          email: userEmail,
          password: userPassword
        }, function(error) {
          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                console.log("The new user account cannot be created because the email is already in use.");
                break;
              case "INVALID_EMAIL":
                console.log("The specified email is not a valid email.");
                break;
              default:
                console.log("Error creating user:", error);
            }
          } else {
              console.log("User account created successfully!");
              $location
          }
        });
      }

      factory.forgotPassword = function(userEmail, cb){
        ref.resetPassword({
          email : userEmail
        }, function(error) {
          if (error === null) {
            cb();
            console.log("Password reset email sent successfully");
          } else {
            console.log("Error sending password reset email:", error);
          }
        });
      }

      factory.changePassword = function(userEmail, oldPass, newPass, cb){
        ref.changePassword({
          email       : userEmail,
          oldPassword : oldPass,
          newPassword : newPass
        }, function(error) {
          if (error === null) {
            console.log('Password changed successfully');
            cb();
          } else {
            console.log('Error changing password:', error);
          }
          }
        );
      }

      return factory

    })

    /////// CONFIG //////////
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/splash.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .when('/myprogress', {
        templateUrl: 'views/myprogress.html',
        controller: 'myProgController',
        controllerAs: 'myProg'
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
        controllerAs: 'login',
        resolve: {
          data: function(authFactory) {
            authFactory.preventMultiLogin();
          }
        }
      })
      .when('/logout', {
        template: '',
        controller: 'logoutController'
      })
      .otherwise({redirectTo: '/'});
    })

    /////// CONTROLLERS //////////
    .controller('myProgController', function($routeParams, authFactory){
      authFactory.requireLogin();
    })

    .controller('logoutController', function($scope, $location, $rootScope){
      var ref = new Firebase('https://groundout.firebaseio.com/');
      ref.unauth(function(){
        $location.path('/');
        $rootScope.user = null;
        $scope.$apply();
      })
    })

    .controller('loginController', function($scope, $location, authFactory){
      var vm = this;

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


    })


}());









// $(document).ready(function(){
//
//   $('button').click(function(){
//     var userInput = $('input').val();
//     console.log(userInput);
//     var url = 'http://api.seatgeek.com/2/events?per_page=83&venue.name=' + userInput;
//     $.ajax({
//       type: "GET",
//       dataType: "jsonp",
//       url: url,
//       success: function(data) {
//         console.log(data);
//       },
//       error: function(err) {
//         console.log(err);
//       }
//     })
//   });
// });
