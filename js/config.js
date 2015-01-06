;(function() {
  "use strict";

  angular.module('myApp')
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
        title: 'MY PROGRESS',
      })
      .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'teamsController',
        controllerAs: 'teams',
        title: 'TEAMS'
      })
      .when('/tickets/:id', {
        templateUrl: 'views/tickets.html',
        controller: 'ticketController',
        controllerAs: 'ticket',
        title: 'TICKETS'
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'loginController',
        controllerAs: 'login',
        title: 'CHANGE PASSWORD'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
        controllerAs: 'login',
        title: 'LOGIN',
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

}());
