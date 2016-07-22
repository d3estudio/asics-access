angular.module('asics').controller('IndexCtrl', [
  '$scope',
  '$state',
  '$window',
  'googlemaps',
  function ($scope, $state, $window, googlemaps) {

    var mapOptions = {
      center: {lat: -22.9891368, lng: -43.4489302},
      zoom: 15,
      scrollwheel: false
    };

    var styles = [
      {
        "stylers": [
          { "visibility": "simplified" },
          { "gamma": 0.98 },
          { "lightness": 43 },
          { "saturation": -85 },
          { "hue": "#0008ff" }
        ]
      }
    ];

    googlemaps.mapsInitialized
      .then(function(){
        map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

        var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
        var image = '/images/hotsite/asics-marker.png';
        var asicsMarker = new google.maps.Marker({
          position: {lat: -22.980162, lng: -43.4608223},
          map: map,
          icon: image
        });

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

      });

  }
]);

var indexStrings = {
  EN: {
    hello: "Hello",
    welcomeMessage: "We look forward to welcoming you at the ASICS Hub."
  },
  PT: {
    hello: "Olá",
    welcomeMessage: "Estamos ansiosos para recebê-lo no ASICS Hub."
  }
};
