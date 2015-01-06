(function() {
  "use strict";

  angular.module('myApp')
  .factory('teamsFactory', function(FirebaseURL){
    var factory = {},
    ref = new Firebase(FirebaseURL);

    factory.teams = [
    {
      name: 'Phillies',
      park: 'Citizens Bank Park',
      image: '../images/teamlogos/phillies.png',
      parkphoto: '../images/parkphotos/Citizens Bank Park.jpg',
      ticketpath: '/#/tickets/citizens bank park',
      visited: false
    },
    {
      name: 'Mets',
      park: 'Citi Field',
      image: '../images/teamlogos/mets.png',
      parkphoto: '../images/parkphotos/Citi Field.jpg',
      ticketpath: '/#/tickets/citi field',
      visited: false
    },
    {
      name: 'Braves',
      park: 'Turner Field',
      image: '../images/teamlogos/braves.png',
      parkphoto: '../images/parkphotos/Turner Field.jpg',
      ticketpath: '/#/tickets/turner field',
      visited: false
    },
    {
      name: 'Marlins',
      park: 'Marlins Park',
      image: '../images/teamlogos/marlins.png',
      parkphoto: '../images/parkphotos/Marlins Park.jpg',
      ticketpath: '/#/tickets/marlins park',
      visited: false
    },
    {
      name: 'Nationals',
      park: 'Nationals Park',
      image: '../images/teamlogos/nationals.png',
      parkphoto: '../images/parkphotos/Nationals Park.jpg',
      ticketpath: '/#/tickets/nationals park',
      visited: false
    },
    {
      name: 'Cardinals',
      park: 'Busch Stadium',
      image: '../images/teamlogos/cardinals.png',
      parkphoto: '../images/parkphotos/Busch Stadium.jpg',
      ticketpath: '/#/tickets/busch stadium',
      visited: false
    },
    {
      name: 'Pirates',
      park: 'PNC Park',
      image: '../images/teamlogos/pirates.png',
      parkphoto: '../images/parkphotos/PNC Park.jpg',
      ticketpath: '/#/tickets/PNC park',
      visited: false
    },
    {
      name: 'Brewers',
      park: 'Miller Park',
      image: '../images/teamlogos/brewers.png',
      parkphoto: '../images/parkphotos/Miller Park.jpg',
      ticketpath: '/#/tickets/miller park',
      visited: false
    },
    {
      name: 'Reds',
      park: 'Great American Ball Park',
      image: '../images/teamlogos/reds.png',
      parkphoto: '../images/parkphotos/Great American Ballpark.jpg',
      ticketpath: '/#/tickets/great american ball park',
      visited: false
    },
    {
      name: 'Chicago Cubs',
      park: 'Wrigley Field',
      image: '../images/teamlogos/cubs.png',
      parkphoto: '../images/parkphotos/Wrigley Field.jpg',
      ticketpath: '/#/tickets/wrigley field',
      visited: false
    },
    {
      name: 'Dodgers',
      park: 'Dodger Stadium',
      image: '../images/teamlogos/dodgers.png',
      parkphoto: '../images/parkphotos/Dodger Stadium.jpg',
      ticketpath: '/#/tickets/dodger stadium',
      visited: false
    },
    {
      name: 'Giants',
      park: 'AT&T Park',
      image: '../images/teamlogos/giants.png',
      parkphoto: '../images/parkphotos/AT&T Park.jpg',
      ticketpath: '/#/tickets/at-t-park',
      visited: false
    },
    {
      name: 'Padres',
      park: 'Petco Park',
      image: '../images/teamlogos/padres.png',
      parkphoto: '../images/parkphotos/Petco Park.jpg',
      ticketpath: '/#/tickets/petco park',
      visited: false
    },
    {
      name: 'Rockies',
      park: 'Coors Field',
      image: '../images/teamlogos/rockies.png',
      parkphoto: '../images/parkphotos/Coors Field.jpg',
      ticketpath: '/#/tickets/coors field',
      visited: false
    },
    {
      name: 'Diamondbacks',
      park: 'Chase Field',
      image: '../images/teamlogos/diamondbacks.png',
      parkphoto: '../images/parkphotos/Chase Field.jpg',
      ticketpath: '/#/tickets/chase field',
      visited: false
    },
    {
      name: 'Orioles',
      park: 'Oriole Park at Camden Yards',
      image: '../images/teamlogos/orioles.png',
      parkphoto: '../images/parkphotos/Camden Yards.jpg',
      ticketpath: '/#/tickets/oriole park at camden yards',
      visited: false
    },
    {
      name: 'Yankees',
      park: 'Yankee Stadium',
      image: '../images/teamlogos/yankees.png',
      parkphoto: '../images/parkphotos/Yankee Stadium.jpg',
      ticketpath: '/#/tickets/yankee stadium',
      visited: false
    },
    {
      name: 'Blue Jays',
      park: 'Rogers Centre',
      image: '../images/teamlogos/bluejays.png',
      parkphoto: '../images/parkphotos/Rogers Centre.jpg',
      ticketpath: '/#/tickets/rogers centre',
      visited: false
    },
    {
      name: 'Rays',
      park: 'Tropicana Field',
      image: '../images/teamlogos/rays.png',
      parkphoto: '../images/parkphotos/Tropicana Field.jpg',
      ticketpath: '/#/tickets/tropicana field',
      visited: false
    },
    {
      name: 'Red Sox',
      park: 'Fenway Park',
      image: '../images/teamlogos/redsox.png',
      parkphoto: '../images/parkphotos/Fenway Park.jpg',
      ticketpath: '/#/tickets/fenway park',
      visited: false
    },
    {
      name: 'Tigers',
      park: 'Comerica Park',
      image: '../images/teamlogos/tigers.png',
      parkphoto: '../images/parkphotos/Comerica Park.jpg',
      ticketpath: '/#/tickets/comerica park',
      visited: false
    },
    {
      name: 'Royals',
      park: 'Kauffman Stadium',
      image: '../images/teamlogos/royals.png',
      parkphoto: '../images/parkphotos/Kauffman Stadium.jpg',
      ticketpath: '/#/tickets/kauffman stadium',
      visited: false
    },
    {
      name: 'Indians',
      park: 'Progressive Field',
      image: '../images/teamlogos/indians.png',
      parkphoto: '../images/parkphotos/Progressive Field.jpg',
      ticketpath: '/#/tickets/progressive field',
      visited: false
    },
    {
      name: 'White Sox',
      park: 'US Cellular Field',
      image: '../images/teamlogos/whitesox.png',
      parkphoto: '../images/parkphotos/US Cellular Field.jpg',
      ticketpath: '/#/tickets/US cellular field',
      visited: false
    },
    {
      name: 'Twins',
      park: 'Target Field',
      image: '../images/teamlogos/twins.png',
      parkphoto: '../images/parkphotos/Target Field.jpg',
      ticketpath: '/#/tickets/target field',
      visited: false
    },
    {
      name: 'Angels',
      park: 'Angel Stadium',
      image: '../images/teamlogos/angels.png',
      parkphoto: '../images/parkphotos/Angel Stadium.jpg',
      ticketpath: '/#/tickets/angel stadium',
      visited: false
    },
    {
      name: 'Athletics',
      park: 'O co Coliseum',
      image: '../images/teamlogos/athletics.png',
      parkphoto: '../images/parkphotos/O.co Coliseum.jpg',
      ticketpath: '/#/tickets/O co Coliseum',
      visited: false
    },
    {
      name: 'Mariners',
      park: 'Safeco Field',
      image: '../images/teamlogos/mariners.png',
      parkphoto: '../images/parkphotos/Safeco Field.jpg',
      ticketpath: '/#/tickets/safeco field',
      visited: false
    },
    {
      name: 'Astros',
      park: 'Minute Maid Park',
      image: '../images/teamlogos/astros.png',
      parkphoto: '../images/parkphotos/Minute Maid Park.jpg',
      ticketpath: '/#/tickets/minute maid park',
      visited: false
    },
    {
      name: 'Rangers',
      park: 'Globe Life Park',
      image: '../images/teamlogos/rangers.png',
      parkphoto: '../images/parkphotos/Globe Life Park.jpg',
      ticketpath: '/#/tickets/globe life park',
      visited: false
    }
    ];

    return factory

  })

}());
