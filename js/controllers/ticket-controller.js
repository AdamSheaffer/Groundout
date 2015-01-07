(function() {
  "use strict";
  angular.module('myApp')
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

}());
