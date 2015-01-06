;(function() {
  "use strict";

  angular.module('myApp')
  .controller('myProgController', function($http, FirebaseURL, $routeParams, authFactory, $rootScope, teamsFactory){
    authFactory.requireLogin();
    var ref = new Firebase(FirebaseURL);
    var vm = this;
    vm.user = $rootScope.user.uid;

    vm.teams = teamsFactory.teams;

    for(var i=0; i<vm.teams.length; i++) {
      vm.teams[i].visited = false;
      delete vm.teams[i].date;
      delete vm.teams[i].rating;
      delete vm.teams[i].comments;
    }

    $http.get(FirebaseURL + 'users/' + vm.user + '/visited_parks.json')
    .success(function(data){
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

    vm.askForDetails = function(parkName) {
      for(var i=0; i<vm.teams.length; i++) {
        if(vm.teams[i].park === parkName) {
          vm.park = vm.teams[i].park;
          vm.parkPic = vm.teams[i].parkphoto;
        }
      }
    }

    vm.editTrip = function(parkName){
      $('#myModal').modal('toggle');
      for(var i=0; i<vm.teams.length; i++) {
        if(vm.teams[i].park === parkName) {
          vm.park = vm.teams[i].park;
          vm.parkPic = vm.teams[i].parkphoto;
          vm.visit = {};
          vm.visit.date = vm.teams[i].date;
          vm.visit.rating = vm.teams[i].rating;
          vm.visit.comments = vm.teams[i].comments;
        }
      }
    }

    vm.hideModal = function() {
      vm.visit = {};
    }

    vm.markAsVisited = function(parkName) {
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
      vm.visit = {};
      $('#myModal').modal('toggle');
    }

  })

  .controller('ticketController', function(FirebaseURL, $routeParams, $scope, teamsFactory, authFactory, $rootScope){
    var vm = this;
    var ref = new Firebase(FirebaseURL);
    vm.venue = $routeParams.id;
    vm.teams = teamsFactory.teams;

    vm.titleCaseParkName = function() { //this is to get park name as title case, and take care of a couple edge cases with names
      if (vm.venue === "at-t-park") {
        return "AT&T Park"
      } else if (vm.venue === "oriole park at camden yards") {
        return "Oriole Park at Camden Yards"
      } else if (vm.venue === "O co Coliseum") {
        return vm.venue;
      }
      else {
        return vm.venue.replace(/\b./g, function(m){ return m.toUpperCase(); });
      }
    }

    vm.avgRating;
    vm.commentsList = [];
    var url = 'http://api.seatgeek.com/2/events?per_page=83&type=mlb&venue.name=' + vm.venue;


    vm.findTickets = function(){
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url,
        success: function(data) {
          vm.schedule = data.events;
          vm.parkName = data.events[0].venue.name;
          vm.matchup = data.events[0].title;
          if(vm.parkName === 'O.co Coliseum') { //for edge case of O co Coliseum name
            vm.parkName = 'O co Coliseum';
          }
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

    vm.findAverageRating = function() {
      var numOfUsers = 0;
      var sumOfRatings = 0;

      ref.child("users").on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var hasRating = !!(childSnapshot.val().visited_parks[vm.titleCaseParkName()]);
          if(hasRating) {
            var rating = childSnapshot.val().visited_parks[vm.titleCaseParkName()].rating;
            numOfUsers ++;
            var stars = rating.replace(/\s/g, '').length; //getting rid of spaces
            sumOfRatings += stars;
          }
        });
        var average = sumOfRatings / numOfUsers
        vm.avgRating = Math.round(average * 100) / 100;
        if (!$rootScope.hasOwnProperty('hasRunApply')) {
          $scope.$apply();
          $rootScope.hasRunApply = true;
        }
      });
    }

    vm.listComments = function() {
      ref.child("users").on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var hasComment = !!(childSnapshot.val().visited_parks[vm.titleCaseParkName()]);
          if(hasComment) {
            var trip = childSnapshot.val().visited_parks[vm.titleCaseParkName()];
            vm.commentsList.push(trip);
          }
        })
      })
    }

    vm.comments = false;

    vm.hideComments = function() {
      vm.comments = false
    }

    vm.showComments = function() {
      vm.comments = true;
    }

    vm.findAverageRating();

    vm.listComments();

    vm.findTickets();

  })

  .controller('teamsController', function(authFactory){

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

            vm.closeAlert = function() {
              $('.alert').hide('drop');
            }

          })

}());
