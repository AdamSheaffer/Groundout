;(function() {
  'use strict';

  angular.module('myApp', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap', 'angularUtils.directives.dirPagination'])

  /////// CONSTANTS //////////
    // .constant('FirebaseURL', 'https://groundout.firebaseio.com/')
    //
    // /////// FACTORY //////////
    // .factory('teamsFactory', function(FirebaseURL){
    //   var factory = {},
    //     ref = new Firebase(FirebaseURL);
    //
    //   factory.teams = [
    //   {
    //     name: 'Phillies',
    //     park: 'Citizens Bank Park',
    //     image: '../images/teamlogos/phillies.png',
    //     parkphoto: '../images/parkphotos/Citizens Bank Park.jpg',
    //     ticketpath: '/#/tickets/citizens bank park',
    //     visited: false
    //   },
    //   {
    //     name: 'Mets',
    //     park: 'Citi Field',
    //     image: '../images/teamlogos/mets.png',
    //     parkphoto: '../images/parkphotos/Citi Field.jpg',
    //     ticketpath: '/#/tickets/citi field',
    //     visited: false
    //   },
    //   {
    //     name: 'Braves',
    //     park: 'Turner Field',
    //     image: '../images/teamlogos/braves.png',
    //     parkphoto: '../images/parkphotos/Turner Field.jpg',
    //     ticketpath: '/#/tickets/turner field',
    //     visited: false
    //   },
    //   {
    //     name: 'Marlins',
    //     park: 'Marlins Park',
    //     image: '../images/teamlogos/marlins.png',
    //     parkphoto: '../images/parkphotos/Marlins Park.jpg',
    //     ticketpath: '/#/tickets/marlins park',
    //     visited: false
    //   },
    //   {
    //     name: 'Nationals',
    //     park: 'Nationals Park',
    //     image: '../images/teamlogos/nationals.png',
    //     parkphoto: '../images/parkphotos/Nationals Park.jpg',
    //     ticketpath: '/#/tickets/nationals park',
    //     visited: false
    //   },
    //   {
    //     name: 'Cardinals',
    //     park: 'Busch Stadium',
    //     image: '../images/teamlogos/cardinals.png',
    //     parkphoto: '../images/parkphotos/Busch Stadium.jpg',
    //     ticketpath: '/#/tickets/busch stadium',
    //     visited: false
    //   },
    //   {
    //     name: 'Pirates',
    //     park: 'PNC Park',
    //     image: '../images/teamlogos/pirates.png',
    //     parkphoto: '../images/parkphotos/PNC Park.jpg',
    //     ticketpath: '/#/tickets/PNC park',
    //     visited: false
    //   },
    //   {
    //     name: 'Brewers',
    //     park: 'Miller Park',
    //     image: '../images/teamlogos/brewers.png',
    //     parkphoto: '../images/parkphotos/Miller Park.jpg',
    //     ticketpath: '/#/tickets/miller park',
    //     visited: false
    //   },
    //   {
    //     name: 'Reds',
    //     park: 'Great American Ball Park',
    //     image: '../images/teamlogos/reds.png',
    //     parkphoto: '../images/parkphotos/Great American Ballpark.jpg',
    //     ticketpath: '/#/tickets/great american ball park',
    //     visited: false
    //   },
    //   {
    //     name: 'Chicago Cubs',
    //     park: 'Wrigley Field',
    //     image: '../images/teamlogos/cubs.png',
    //     parkphoto: '../images/parkphotos/Wrigley Field.jpg',
    //     ticketpath: '/#/tickets/wrigley field',
    //     visited: false
    //   },
    //   {
    //     name: 'Dodgers',
    //     park: 'Dodger Stadium',
    //     image: '../images/teamlogos/dodgers.png',
    //     parkphoto: '../images/parkphotos/Dodger Stadium.jpg',
    //     ticketpath: '/#/tickets/dodger stadium',
    //     visited: false
    //   },
    //   {
    //     name: 'Giants',
    //     park: 'AT&T Park',
    //     image: '../images/teamlogos/giants.png',
    //     parkphoto: '../images/parkphotos/AT&T Park.jpg',
    //     ticketpath: '/#/tickets/at-t-park',
    //     visited: false
    //   },
    //   {
    //     name: 'Padres',
    //     park: 'Petco Park',
    //     image: '../images/teamlogos/padres.png',
    //     parkphoto: '../images/parkphotos/Petco Park.jpg',
    //     ticketpath: '/#/tickets/petco park',
    //     visited: false
    //   },
    //   {
    //     name: 'Rockies',
    //     park: 'Coors Field',
    //     image: '../images/teamlogos/rockies.png',
    //     parkphoto: '../images/parkphotos/Coors Field.jpg',
    //     ticketpath: '/#/tickets/coors field',
    //     visited: false
    //   },
    //   {
    //     name: 'Diamondbacks',
    //     park: 'Chase Field',
    //     image: '../images/teamlogos/diamondbacks.png',
    //     parkphoto: '../images/parkphotos/Chase Field.jpg',
    //     ticketpath: '/#/tickets/chase field',
    //     visited: false
    //   },
    //   {
    //     name: 'Orioles',
    //     park: 'Oriole Park at Camden Yards',
    //     image: '../images/teamlogos/orioles.png',
    //     parkphoto: '../images/parkphotos/Camden Yards.jpg',
    //     ticketpath: '/#/tickets/oriole park at camden yards',
    //     visited: false
    //   },
    //   {
    //     name: 'Yankees',
    //     park: 'Yankee Stadium',
    //     image: '../images/teamlogos/yankees.png',
    //     parkphoto: '../images/parkphotos/Yankee Stadium.jpg',
    //     ticketpath: '/#/tickets/yankee stadium',
    //     visited: false
    //   },
    //   {
    //     name: 'Blue Jays',
    //     park: 'Rogers Centre',
    //     image: '../images/teamlogos/bluejays.png',
    //     parkphoto: '../images/parkphotos/Rogers Centre.jpg',
    //     ticketpath: '/#/tickets/rogers centre',
    //     visited: false
    //   },
    //   {
    //     name: 'Rays',
    //     park: 'Tropicana Field',
    //     image: '../images/teamlogos/rays.png',
    //     parkphoto: '../images/parkphotos/Tropicana Field.jpg',
    //     ticketpath: '/#/tickets/tropicana field',
    //     visited: false
    //   },
    //   {
    //     name: 'Red Sox',
    //     park: 'Fenway Park',
    //     image: '../images/teamlogos/redsox.png',
    //     parkphoto: '../images/parkphotos/Fenway Park.jpg',
    //     ticketpath: '/#/tickets/fenway park',
    //     visited: false
    //   },
    //   {
    //     name: 'Tigers',
    //     park: 'Comerica Park',
    //     image: '../images/teamlogos/tigers.png',
    //     parkphoto: '../images/parkphotos/Comerica Park.jpg',
    //     ticketpath: '/#/tickets/comerica park',
    //     visited: false
    //   },
    //   {
    //     name: 'Royals',
    //     park: 'Kauffman Stadium',
    //     image: '../images/teamlogos/royals.png',
    //     parkphoto: '../images/parkphotos/Kauffman Stadium.jpg',
    //     ticketpath: '/#/tickets/kauffman stadium',
    //     visited: false
    //   },
    //   {
    //     name: 'Indians',
    //     park: 'Progressive Field',
    //     image: '../images/teamlogos/indians.png',
    //     parkphoto: '../images/parkphotos/Progressive Field.jpg',
    //     ticketpath: '/#/tickets/progressive field',
    //     visited: false
    //   },
    //   {
    //     name: 'White Sox',
    //     park: 'US Cellular Field',
    //     image: '../images/teamlogos/whitesox.png',
    //     parkphoto: '../images/parkphotos/US Cellular Field.jpg',
    //     ticketpath: '/#/tickets/US cellular field',
    //     visited: false
    //   },
    //   {
    //     name: 'Twins',
    //     park: 'Target Field',
    //     image: '../images/teamlogos/twins.png',
    //     parkphoto: '../images/parkphotos/Target Field.jpg',
    //     ticketpath: '/#/tickets/target field',
    //     visited: false
    //   },
    //   {
    //     name: 'Angels',
    //     park: 'Angel Stadium',
    //     image: '../images/teamlogos/angels.png',
    //     parkphoto: '../images/parkphotos/Angel Stadium.jpg',
    //     ticketpath: '/#/tickets/angel stadium',
    //     visited: false
    //   },
    //   {
    //     name: 'Athletics',
    //     park: 'O co Coliseum',
    //     image: '../images/teamlogos/athletics.png',
    //     parkphoto: '../images/parkphotos/O.co Coliseum.jpg',
    //     ticketpath: '/#/tickets/O co Coliseum',
    //     visited: false
    //   },
    //   {
    //     name: 'Mariners',
    //     park: 'Safeco Field',
    //     image: '../images/teamlogos/mariners.png',
    //     parkphoto: '../images/parkphotos/Safeco Field.jpg',
    //     ticketpath: '/#/tickets/safeco field',
    //     visited: false
    //   },
    //   {
    //     name: 'Astros',
    //     park: 'Minute Maid Park',
    //     image: '../images/teamlogos/astros.png',
    //     parkphoto: '../images/parkphotos/Minute Maid Park.jpg',
    //     ticketpath: '/#/tickets/minute maid park',
    //     visited: false
    //   },
    //   {
    //     name: 'Rangers',
    //     park: 'Globe Life Park',
    //     image: '../images/teamlogos/rangers.png',
    //     parkphoto: '../images/parkphotos/Globe Life Park.jpg',
    //     ticketpath: '/#/tickets/globe life park',
    //     visited: false
    //   }
    //   ];
    //
    //   return factory
    //
    // })
    //
    // .factory('authFactory', function(FirebaseURL, $http, $location, $rootScope){
    //   var factory = {},
    //
    //   ref = new Firebase(FirebaseURL);
    //
    //   $rootScope.user = ref.getAuth();
    //
    //   function isLoggedIn(){
    //     return !!(ref.getAuth());
    //   };
    //
    //   factory.requireLogin = function(){
    //     if (!isLoggedIn()) {
    //       $location.path('/login');
    //     }
    //   };
    //
    //   factory.preventMultiLogin = function(){
    //     if(isLoggedIn()) {
    //       $location.path('/myprogress');
    //     }
    //   }
    //
    //   factory.login = function(userEmail, userPassword, cb){
    //     ref.authWithPassword({
    //       email    : userEmail,
    //       password : userPassword
    //     }, function(error, authData) {
    //       if (error) {
    //         switch (error.code) {
    //           case "INVALID_EMAIL":
    //             $('.invalid-email-alert').show('drop');
    //             break;
    //           case "INVALID_PASSWORD":
    //             $('.wrong-password-alert').show('drop');
    //             break;
    //           case "INVALID_USER":
    //             $('.invalid-user-alert').show('drop');
    //             break;
    //           default:
    //             console.log("Error logging user in:", error);
    //         }
    //       } else {
    //           console.log("Authenticated successfully with payload:", authData);
    //           $rootScope.user = authData;
    //           ref.child('users').child(authData.uid).child('authData').set(authData);
    //           ref.child('users').child(authData.uid).child('visited_parks').child('new-user').set('true');
    //           cb();
    //       }
    //     });
    //   }
    //
    //   factory.register = function(userEmail, userPassword, cb){
    //     ref.createUser({
    //       email: userEmail,
    //       password: userPassword
    //     }, function(error) {
    //       if (error) {
    //         switch (error.code) {
    //           case "EMAIL_TAKEN":
    //             $('.email-taken-alert').show('drop');
    //             break;
    //           case "INVALID_EMAIL":
    //             $('.invalid-email-alert').show('drop');
    //             break;
    //           default:
    //             console.log("Error creating user:", error);
    //         }
    //       } else {
    //           cb();
    //       }
    //     });
    //   }
    //
    //   factory.forgotPassword = function(userEmail, cb){
    //     ref.resetPassword({
    //       email : userEmail
    //     }, function(error) {
    //       if (error === null) {
    //         cb();
    //       } else {
    //         $('.reset-fail-alert').show('drop');
    //       }
    //     });
    //   }
    //
    //   factory.changePassword = function(userEmail, oldPass, newPass, cb){
    //     ref.changePassword({
    //       email       : userEmail,
    //       oldPassword : oldPass,
    //       newPassword : newPass
    //     }, function(error) {
    //       if (error === null) {
    //         console.log('Password changed successfully');
    //         cb();
    //       } else {
    //         $('.reset-fail-alert').show('drop');
    //       }
    //       }
    //     );
    //   }
    //
    //   return factory
    //
    // })
    //
    // /////// CONFIG //////////
    // .config(function($routeProvider){
    //   $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/splash.html',
    //     controller: 'loginController',
    //     controllerAs: 'login',
    //   })
    //   .when('/myprogress', {
    //     templateUrl: 'views/myprogress.html',
    //     controller: 'myProgController',
    //     controllerAs: 'myProg',
    //     title: 'MY PROGRESS',
    //   })
    //   .when('/teams', {
    //     templateUrl: 'views/teams.html',
    //     controller: 'teamsController',
    //     controllerAs: 'teams',
    //     title: 'TEAMS'
    //   })
    //   .when('/tickets/:id', {
    //     templateUrl: 'views/tickets.html',
    //     controller: 'ticketController',
    //     controllerAs: 'ticket',
    //     title: 'TICKETS'
    //   })
    //   .when('/changepassword', {
    //     templateUrl: 'views/changepassword.html',
    //     controller: 'loginController',
    //     controllerAs: 'login',
    //     title: 'CHANGE PASSWORD'
    //   })
    //   .when('/login', {
    //     templateUrl: 'views/login.html',
    //     controller: 'loginController',
    //     controllerAs: 'login',
    //     title: 'LOGIN',
    //     resolve: {
    //       data: function(authFactory) {
    //         authFactory.preventMultiLogin();
    //       }
    //     }
    //   })
    //   .when('/logout', {
    //     template: '',
    //     controller: 'logoutController'
    //   })
    //   .otherwise({redirectTo: '/'});
    // })
    // .run(['$location', '$rootScope', function($location, $rootScope) {
    //   $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    //     $rootScope.title = current.$$route.title;
    //   });
    // }])
    //
    // /////// CONTROLLERS //////////
    //   .controller('myProgController', function($http, FirebaseURL, $routeParams, authFactory, $rootScope, teamsFactory){
    //   authFactory.requireLogin();
    //   var ref = new Firebase(FirebaseURL);
    //   var vm = this;
    //   vm.user = $rootScope.user.uid;
    //
    //   vm.teams = teamsFactory.teams;
    //
    //   for(var i=0; i<vm.teams.length; i++) {
    //     vm.teams[i].visited = false;
    //     delete vm.teams[i].date;
    //     delete vm.teams[i].rating;
    //     delete vm.teams[i].comments;
    //   }
    //
    //   $http.get(FirebaseURL + 'users/' + vm.user + '/visited_parks.json')
    //     .success(function(data){
    //       for(var i=0; i<vm.teams.length; i++) {
    //         var team = vm.teams[i];
    //         if(!!data[team.park]) {
    //           team.visited = true;
    //           team.date = data[team.park].date;
    //           team.rating = data[team.park].rating;
    //           team.comments = data[team.park].comments;
    //         }
    //       }
    //     })
    //     .error(function(err){
    //       console.log(err);
    //     });
    //
    //   vm.percentComplete = function() {
    //     var totalVisited = 0;
    //     var totalTeams = vm.teams.length
    //     for(var i=0; i<totalTeams; i++) {
    //       if(vm.teams[i].visited === true) {
    //         totalVisited ++;
    //       }
    //     }
    //     return Math.round(totalVisited / totalTeams * 100) + '%';
    //   };
    //
    //   vm.askForDetails = function(parkName) {
    //     for(var i=0; i<vm.teams.length; i++) {
    //       if(vm.teams[i].park === parkName) {
    //         vm.park = vm.teams[i].park;
    //         vm.parkPic = vm.teams[i].parkphoto;
    //       }
    //     }
    //   }
    //
    //   vm.editTrip = function(parkName){
    //     $('#myModal').modal('toggle');
    //     for(var i=0; i<vm.teams.length; i++) {
    //       if(vm.teams[i].park === parkName) {
    //         vm.park = vm.teams[i].park;
    //         vm.parkPic = vm.teams[i].parkphoto;
    //         vm.visit = {};
    //         vm.visit.date = vm.teams[i].date;
    //         vm.visit.rating = vm.teams[i].rating;
    //         vm.visit.comments = vm.teams[i].comments;
    //       }
    //     }
    //   }
    //
    //   vm.hideModal = function() {
    //     vm.visit = {};
    //   }
    //
    //   vm.markAsVisited = function(parkName) {
    //     var parkLocation = ref.child('users').child(vm.user).child('visited_parks').child(parkName);
    //     parkLocation.set(vm.visit);
    //     for(var i=0; i<vm.teams.length; i++) {
    //       if(vm.teams[i].park === parkName) {
    //         vm.teams[i].visited = true;
    //         vm.teams[i].date = vm.visit.date;
    //         vm.teams[i].rating = vm.visit.rating;
    //         vm.teams[i].comments = vm.visit.comments;
    //       }
    //     }
    //     vm.visit = {};
    //     $('#myModal').modal('toggle');
    //   }
    //
    // })
    //
    // .controller('ticketController', function(FirebaseURL, $routeParams, $scope, teamsFactory, authFactory, $rootScope){
    //   var vm = this;
    //   var ref = new Firebase(FirebaseURL);
    //   vm.venue = $routeParams.id;
    //   vm.teams = teamsFactory.teams;
    //
    //   vm.titleCaseParkName = function() { //this is to get park name as title case, and take care of a couple edge cases with names
    //     if (vm.venue === "at-t-park") {
    //       return "AT&T Park"
    //     } else if (vm.venue === "oriole park at camden yards") {
    //         return "Oriole Park at Camden Yards"
    //     } else if (vm.venue === "O co Coliseum") {
    //         return vm.venue;
    //     }
    //     else {
    //       return vm.venue.replace(/\b./g, function(m){ return m.toUpperCase(); });
    //     }
    //   }
    //
    //   vm.avgRating;
    //   vm.commentsList = [];
    //   var url = 'http://api.seatgeek.com/2/events?per_page=83&type=mlb&venue.name=' + vm.venue;
    //
    //
    //   vm.findTickets = function(){
    //     $.ajax({
    //       type: "GET",
    //       dataType: "jsonp",
    //       url: url,
    //       success: function(data) {
    //         vm.schedule = data.events;
    //         vm.parkName = data.events[0].venue.name;
    //         vm.matchup = data.events[0].title;
    //         if(vm.parkName === 'O.co Coliseum') { //for edge case of O co Coliseum name
    //           vm.parkName = 'O co Coliseum';
    //         }
    //         for(var i=0; i<vm.teams.length; i++) {
    //           if(vm.teams[i].park === vm.parkName) {
    //             vm.parkPic = vm.teams[i].parkphoto;
    //           }
    //         }
    //         $scope.$apply();
    //       },
    //       error: function(err) {
    //         console.log(err);
    //       }
    //     });
    //   }
    //
    //   vm.findAverageRating = function() {
    //     var numOfUsers = 0;
    //     var sumOfRatings = 0;
    //
    //     ref.child("users").on("value", function(snapshot) {
    //       snapshot.forEach(function(childSnapshot){
    //         var hasRating = !!(childSnapshot.val().visited_parks[vm.titleCaseParkName()]);
    //         if(hasRating) {
    //           var rating = childSnapshot.val().visited_parks[vm.titleCaseParkName()].rating;
    //           numOfUsers ++;
    //           var stars = rating.replace(/\s/g, '').length; //getting rid of spaces
    //           sumOfRatings += stars;
    //         }
    //       });
    //       var average = sumOfRatings / numOfUsers
    //       vm.avgRating = Math.round(average * 100) / 100;
    //       if (!$rootScope.hasOwnProperty('hasRunApply')) {
    //         $scope.$apply();
    //         $rootScope.hasRunApply = true;
    //       }
    //     });
    //   }
    //
    //   vm.listComments = function() {
    //     ref.child("users").on("value", function(snapshot) {
    //       snapshot.forEach(function(childSnapshot){
    //         var hasComment = !!(childSnapshot.val().visited_parks[vm.titleCaseParkName()]);
    //         if(hasComment) {
    //           var trip = childSnapshot.val().visited_parks[vm.titleCaseParkName()];
    //           vm.commentsList.push(trip);
    //         }
    //       })
    //     })
    //   }
    //
    //   vm.comments = false;
    //
    //   vm.hideComments = function() {
    //     vm.comments = false
    //   }
    //
    //   vm.showComments = function() {
    //     vm.comments = true;
    //   }
    //
    //   vm.findAverageRating();
    //
    //   vm.listComments();
    //
    //   vm.findTickets();
    //
    // })
    //
    // .controller('teamsController', function(authFactory){
    //
    // })
    //
    // .controller('logoutController', function($scope, $location, $rootScope){
    //   var ref = new Firebase('https://groundout.firebaseio.com/');
    //   ref.unauth(function(){
    //     $location.path('/');
    //     $rootScope.user = null;
    //     $scope.$apply();
    //   })
    // })
    //
    // .controller('loginController', function($rootScope, $scope, $location, authFactory){
    //   var vm = this;
    //
    //   $rootScope.page = function() {
    //     switch($location.$$path){
    //       case "/login":
    //         return "Login"
    //         break;
    //       case "/changepassword":
    //         return "Change Password"
    //         break;
    //       case "teams":
    //         return "Teams"
    //         break;
    //       case "myprogress":
    //         return "My Progress"
    //         break;
    //     }
    //   }
    //
    //   vm.login = function(){
    //     authFactory.login(vm.email, vm.password, function(){
    //       $location.path('/myprogress');
    //       $scope.$apply();
    //     });
    //   }
    //
    //   vm.register = function(){
    //     authFactory.register(vm.email, vm.password, function(){
    //       vm.login();
    //     });
    //   }
    //
    //   vm.forgotPassword = function() {
    //     authFactory.forgotPassword(vm.email, function(){
    //       $location.path('/changepassword');
    //       $scope.$apply();
    //     });
    //   }
    //
    //   vm.changePassword = function() {
    //     authFactory.changePassword(vm.email, vm.oldPassword, vm.newPassword, function(){
    //       $location.path('/');
    //       $scope.$apply();
    //     });
    //   }
    //
    //   vm.closeAlert = function() {
    //     $('.alert').hide('drop');
    //   }
    //
    // })


}());
