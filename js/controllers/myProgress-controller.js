(function() {
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

      function checkForBadges(numParks) {
        if (numParks >= 5) {
          $('.trophy-bronze').removeClass('unachieved');
        } if (numParks >= 15) {
          $('.trophy-silver').removeClass('unachieved');
        } if(numParks >= 30) {
          $('.trophy-gold').removeClass('unachieved');
        }
      }

      vm.percentComplete = function() {
        var totalVisited = 0;
        var totalTeams = vm.teams.length
        for(var i=0; i<totalTeams; i++) {
          if(vm.teams[i].visited === true) {
            totalVisited ++;
          }
        }
        checkForBadges(totalVisited);
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

}());
