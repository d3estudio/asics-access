angular.module('asics').controller('IndexCtrl', [
  '$scope',
  '$state',
  '$window',
  '$timeout',
  '$location',
  'googlemaps',
  'smoothScroll',
  function ($scope, $state, $window, $timeout, $location, googlemaps, smoothScroll) {
    $scope.videoLink = 'https://www.youtube.com/embed/OGNReSh_uyo?autoplay=1&modestbranding=1;controls=1;showinfo=0;rel=0;fs=1';
    $scope.isVideoOpen = false;
    $scope.isDialogOpen = false;
    $scope.locationFound = false;
    $scope.distance = '';
    $scope.duration = '';
    $scope.address = {
      name: ''
    };

    $scope.openVideo = function () {
      $scope.isVideoOpen = true;
      window.scrollTo(0,0);
      angular.element( document.querySelector( 'body' ) ).addClass('hide-overflow');
    };

    $scope.closeVideo = function () {
      $scope.isVideoOpen = false;
      angular.element( document.querySelector( 'body' ) ).removeClass('hide-overflow');
    };

    $scope.gotoElement = function (eID) {
      $location.hash(eID);
      smoothScroll.scrollTo(eID);
    };

    $scope.openCloseDialog = function () {
      if ($scope.isDialogOpen){
        $scope.isDialogOpen = false;
        $scope.locationFound = false;
      } else {
        $scope.isDialogOpen = true;
        if ($scope.address.name)
          $scope.locationFound = true;
        $scope.locationFound = false;
      }
    };

    var mapLat = -22.9891368;
    var mapLng = -43.4489302;
    var hubLat = -22.980162;
    var hubLng = -43.4608223;

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
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay;
        var map;

        initialize();

        function initialize() {
          var mapOptions = {
            center: {lat: mapLat, lng: mapLng},
            zoom: 15,
            scrollwheel: false
          };
          map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

          directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#3DB7E4"
            }
          });

          var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
          var icon = '/images/hotsite/asics-marker.png';
          var asicsMarker = new google.maps.Marker({
            position: {lat: hubLat, lng: hubLng},
            map: map,
            icon: icon
          });

          map.mapTypes.set('map_style', styledMap);
          map.setMapTypeId('map_style');
          directionsDisplay.setMap(map);
        }


        $scope.$watch('address.name', onSearchTextChanged);

        var searchTimeout;
        function onSearchTextChanged() {
          clearTimeout(searchTimeout);
          if ($scope.address.name)
            searchTimeout = $timeout(applySearch, 4000);
          else
            $scope.locationFound = false;
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
              $scope.locationNotFound = false;
              directionsDisplay.setDirections(result);

              $scope.distance = result.routes[0].legs[0].distance.text;
              $scope.duration = result.routes[0].legs[0].duration.text;
            } else {
              $scope.locationNotFound = true;
            }
          });

          $timeout(function () {
            if ($scope.isDialogOpen)
              $scope.locationFound = true;
          }, 1000);
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
