angular.module('asics').controller('IndexCtrl', [
  '$scope',
  '$state',
  '$window',
  '$timeout',
  '$location',
  'googlemaps',
  'smoothScroll',
  function ($scope, $state, $window, $timeout, $location, googlemaps, smoothScroll) {
    $scope.isDialogOpen = false;
    $scope.address = {
      name: ''
    };

    $scope.gotoElement = function (eID){
      $location.hash('bottom');
      smoothScroll.scrollTo(eID);
    };

    var mapLat = -22.9891368;
    var mapLng = -43.4489302;
    var hubLat = -22.980162;
    var hubLng = -43.4608223;

    var mapOptions = {
      center: {lat: mapLat, lng: mapLng},
      zoom: 15,
      scrollwheel: false
    };

    var styles = [
      {
        "stylers": [
          {"visibility": "simplified"},
          {"gamma": 0.98},
          {"lightness": 43},
          {"saturation": -85},
          {"hue": "#0008ff"}
        ]
      }
    ];

    googlemaps.mapsInitialized
      .then(function () {
        var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#3DB7E4"
          }
        });

        var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
        var image = '/images/hotsite/asics-marker.png';
        var asicsMarker = new google.maps.Marker({
          position: {lat: hubLat, lng: hubLng},
          map: map,
          icon: image
        });

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        directionsDisplay.setMap(map);

        $scope.$watch('address.name', onSearchTextChanged);

        var searchTimeout;
        function onSearchTextChanged() {
          clearTimeout(searchTimeout);
          if ($scope.address.name)
            searchTimeout = $timeout(applySearch, 3000);
        }

        function applySearch() {
          var start = $scope.address.name;
          var end = new google.maps.LatLng(hubLat, hubLng);
          var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
          };

          directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
          });
        }

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
