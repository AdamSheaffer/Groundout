(function() {
  'use strict';

  angular.module('myApp', ['ngRoute'])
    .constant('FirebaseURL', 'https://groundout.firebaseio.com/')

    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: '/#/'
      })
    })

    .controller('loginController', function($scope, $location){
      var vm = this;

      vm.login = function(){
        var ref = new Firebase('https://groundout.firebaseio.com/');
        ref.authWithPassword({
          email    : vm.email,
          password : vm.password
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
              $location.path('/');
              $scope.$apply();
          }
        });
      }

      vm.register = function(){
        var ref = new Firebase('https://groundout.firebaseio.com/');
        ref.createUser({
          email: vm.email,
          password: vm.password
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
              vm.login();
          }
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
