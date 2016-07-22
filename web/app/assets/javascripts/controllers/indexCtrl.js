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
        var styledMap = new google.maps.StyledMapType(styles,
          {name: "Styled Map"});

        map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
      });




  }
]);

var indexStrings = {
  EN: {
    hello: "Hello",
    welcomeMessage: "We look forward to welcoming you at the ASICS Hub.",
    formLabelGuest: "Click on the button below to confirm attendance.",
    formLabelAthlete: "We want you to feel at home, so please answer this question before confirm your attendance.",
    formLabelMusic: "Which song makes you feel like a champion?",
    formErrorRequiredMusic: "Please, type the song name",
    formButtonConfirmPresence: "Confirm attendance"
  },
  PT: {
    hello: "Olá",
    welcomeMessage: "Estamos ansiosos para recebê-lo no ASICS Hub.",
    formLabelGuest: "Clique no botão abaixo para confirmar presença.",
    formLabelAthlete: "Nós queremos que você se sinta em casa, então por favor responda a esta pergunta antes de confirmar a sua presença.",
    formLabelMusic: "Que música faz você se sentir como um campeão?",
    formErrorRequiredMusic: "Por favor, preencha o nome da música",
    formButtonConfirmPresence: "Confirmar presença"
  }
};
