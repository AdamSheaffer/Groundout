;(function() {
  "use strict";

  angular.module('myApp')
  .factory('authFactory', function(FirebaseURL, $http, $location, $rootScope){
    var factory = {},

    ref = new Firebase(FirebaseURL);

    $rootScope.user = ref.getAuth();

    function isLoggedIn(){
      return !!(ref.getAuth());
    }

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
              $('.invalid-email-alert').show('drop');
              break;
              case "INVALID_PASSWORD":
                $('.wrong-password-alert').show('drop');
                break;
                case "INVALID_USER":
                  $('.invalid-user-alert').show('drop');
                  break;
                  default:
                    console.log("Error logging user in:", error);
                  }
                } else {
                  console.log("Authenticated successfully with payload:", authData);
                  $rootScope.user = authData;
                  ref.child('users').child(authData.uid).child('authData').set(authData);
                  ref.child('users').child(authData.uid).child('visited_parks').child('new-user').set('true');
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
                      $('.email-taken-alert').show('drop');
                      break;
                      case "INVALID_EMAIL":
                        $('.invalid-email-alert').show('drop');
                        break;
                        default:
                          console.log("Error creating user:", error);
                        }
                      } else {
                        cb();
                      }
                    });
                  }

                  factory.forgotPassword = function(userEmail, cb){
                    ref.resetPassword({
                      email : userEmail
                    }, function(error) {
                      if (error === null) {
                        cb();
                      } else {
                        $('.reset-fail-alert').show('drop');
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
                        $('.reset-fail-alert').show('drop');
                      }
                    }
                  );
                }

                return factory

              })

}());
