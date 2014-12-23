(function() {
  'use strict';

  angular.module('myApp', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap', 'angularUtils.directives.dirPagination'])

  /////// CONSTANTS //////////
    .constant('FirebaseURL', 'https://groundout.firebaseio.com/')

    /////// FACTORY //////////
    .factory('teamsFactory', function(FirebaseURL){
      var factory = {},
        ref = new Firebase(FirebaseURL);

      factory.teams = [
      {
        name: 'Phillies',
        park: 'Citizens Bank Park',
        image: '../images/teamlogos/phillies.png',
        parkphoto: '../images/parkphotos/Citizens Bank Park.jpg',
        visited: false
      },
      {
        name: 'Mets',
        park: 'Citi Field',
        image: '../images/teamlogos/mets.png',
        parkphoto: '../images/parkphotos/Citi Field.jpg',
        visited: false
      },
      {
        name: 'Braves',
        park: 'Turner Field',
        image: '../images/teamlogos/braves.png',
        parkphoto: '../images/parkphotos/Turner Field.jpg',
        visited: false
      },
      {
        name: 'Marlins',
        park: 'Marlins Park',
        image: '../images/teamlogos/marlins.png',
        parkphoto: '../images/parkphotos/Marlins Park.jpg',
        visited: false
      },
      {
        name: 'Nationals',
        park: 'Nationals Park',
        image: '../images/teamlogos/nationals.png',
        parkphoto: '../images/parkphotos/Nationals Park.jpg',
        visited: false
      },
      {
        name: 'Cardinals',
        park: 'Busch Stadium',
        image: '../images/teamlogos/cardinals.png',
        parkphoto: '../images/parkphotos/Busch Stadium.jpg',
        visited: false
      },
      {
        name: 'Pirates',
        park: 'PNC Park',
        image: '../images/teamlogos/pirates.png',
        parkphoto: '../images/parkphotos/PNC Park.jpg',
        visited: false
      },
      {
        name: 'Brewers',
        park: 'Miller Park',
        image: '../images/teamlogos/brewers.png',
        parkphoto: '../images/parkphotos/Miller Park.jpg',
        visited: false
      },
      {
        name: 'Reds',
        park: 'Great American Ball Park',
        image: '../images/teamlogos/reds.png',
        parkphoto: '../images/parkphotos/Great American Ballpark.jpg',
        visited: false
      },
      {
        name: 'Chicago Cubs',
        park: 'Wrigley Field',
        image: '../images/teamlogos/cubs.png',
        parkphoto: '../images/parkphotos/Wrigley Field.jpg',
        visited: false
      },
      {
        name: 'Dodgers',
        park: 'Dodger Stadium',
        image: '../images/teamlogos/dodgers.png',
        parkphoto: '../images/parkphotos/Dodger Stadium.jpg',
        visited: false
      },
      {
        name: 'Giants',
        park: 'AT&T Park',
        image: '../images/teamlogos/giants.gif',
        parkphoto: '../images/parkphotos/AT&T Park.jpg',
        visited: false
      },
      {
        name: 'Padres',
        park: 'Petco Park',
        image: '../images/teamlogos/padres.png',
        parkphoto: '../images/parkphotos/Petco Park.jpg',
        visited: false
      },
      {
        name: 'Rockies',
        park: 'Coors Field',
        image: '../images/teamlogos/rockies.png',
        parkphoto: '../images/parkphotos/Coors Field.jpg',
        visited: false
      },
      {
        name: 'Diamondbacks',
        park: 'Chase Field',
        image: '../images/teamlogos/diamondbacks.png',
        parkphoto: '../images/parkphotos/Chase Field.jpg',
        visited: false
      },
      ];

      return factory

    })

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
              ref.child('users').child(authData.uid).child('authData').set(authData);
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
        controllerAs: 'login',
      })
      .when('/myprogress', {
        templateUrl: 'views/myprogress.html',
        controller: 'myProgController',
        controllerAs: 'myProg',
        title: 'My Progress',
      })
      .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'teamsController',
        controllerAs: 'teams',
        title: 'Teams'
      })
      .when('/tickets/:id', {
        templateUrl: 'views/tickets.html',
        controller: 'ticketController',
        controllerAs: 'ticket',
        title: 'Tickets'
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'loginController',
        controllerAs: 'login',
        title: 'Change Password'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
        controllerAs: 'login',
        title: 'Login',
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
    .run(['$location', '$rootScope', function($location, $rootScope) {
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
      });
    }])

    /////// CONTROLLERS //////////
      .controller('myProgController', function($http, FirebaseURL, $routeParams, authFactory, $rootScope, teamsFactory){
      authFactory.requireLogin();

      var ref = new Firebase(FirebaseURL);
      var vm = this;
      vm.user = $rootScope.user.uid;

      vm.teams = teamsFactory.teams;

      $http.get(FirebaseURL + 'users/' + vm.user + '/visited_parks.json')
        .success(function(data){
          debugger
          for(var i=0; i<vm.teams.length; i++) {
            var team = vm.teams[i];
            if(!!data[team.park]) {
              team.visited = true;
              team.date = data[team.park].date;
              team.rating = data[team.park].rating;
              team.comments = data[team.park].comments;
            }
          }
        })
        .error(function(err){
          console.log(err);
        });

      vm.percentComplete = function() {
        var totalVisited = 0;
        var totalTeams = vm.teams.length
        for(var i=0; i<totalTeams; i++) {
          if(vm.teams[i].visited === true) {
            totalVisited ++;
          }
        }
        return Math.round(totalVisited / totalTeams * 100) + '%';
      };

      vm.showModal = false;

      vm.askForDetails = function(parkName) {
        for(var i=0; i<vm.teams.length; i++) {
          if(vm.teams[i].park === parkName) {
            vm.showModal = vm.teams[i].park;
          }
        }
      }

      vm.hideModal = function() {
        vm.showModal = false;
      }

      vm.markAsVisited = function(parkName) {
        debugger
        var parkLocation = ref.child('users').child(vm.user).child('visited_parks').child(parkName);
        parkLocation.set(vm.visit);
        for(var i=0; i<vm.teams.length; i++) {
          if(vm.teams[i].park === parkName) {
            vm.teams[i].visited = true;
            vm.teams[i].date = vm.visit.date;
            vm.teams[i].rating = vm.visit.rating;
            vm.teams[i].comments = vm.visit.comments;
          }
        }
      }

    })

    .controller('ticketController', function($routeParams, $scope, teamsFactory){
      var vm = this;
      vm.venue = $routeParams.id;
      vm.teams = teamsFactory.teams;
      var url = 'http://api.seatgeek.com/2/events?per_page=83&type=mlb&venue.name=' + vm.venue

      vm.findTickets = function(){
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          url: url,
          success: function(data) {
            vm.schedule = data.events;
            vm.parkName = data.events[0].venue.name;
            vm.matchup = data.events[0].title;
            for(var i=0; i<vm.teams.length; i++) {
              if(vm.teams[i].park === vm.parkName) {
                vm.parkPic = vm.teams[i].parkphoto;
              }
            }
            $scope.$apply();
          },
          error: function(err) {
            console.log(err);
          }
        });
      }

      vm.findTickets();

    })

    .controller('teamsController', function($location){

    })

    .controller('logoutController', function($scope, $location, $rootScope){
      var ref = new Firebase('https://groundout.firebaseio.com/');
      ref.unauth(function(){
        $location.path('/');
        $rootScope.user = null;
        $scope.$apply();
      })
    })

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

    })


}());
