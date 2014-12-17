(function() {
  'use strict';

  angular.module('myApp', ['ngRoute'])
    .constant('FirebaseURL', 'https://groundout.firebaseio.com/')

    .factory('authFactory', function(FirebaseURL, $http, $location){
      var factory = {},
        ref = new Firebase(FirebaseURL);

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
              cb()
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

      return factory

    })

    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/splash.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .when('/myprogress', {
        templateUrl: 'views/myprogress.html'
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .otherwise({redirectTo: '/'});
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

      vm.logout = function() {
        var ref = new Firebase('https://groundout.firebaseio.com/');
        ref.unauth(function(){
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
