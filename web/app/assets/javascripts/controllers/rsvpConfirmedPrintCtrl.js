angular.module('asics').controller('RsvpConfirmedPrintCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$timeout',
  '$window',
  'rsvp',
  function ($scope, $state, $stateParams, $timeout, $window, rsvp) {
    $scope.guest = {};
    $scope.strings = {};

    $timeout(function() {
      $window.print();
    }, 400);

    rsvp.getGuestByToken($stateParams.token)
        .then(readGuest)
        .catch(onInvalidToken);

    function readGuest(guest) {
      angular.copy(guest, $scope.guest);
      angular.copy(confirmedStrings[guest.language], $scope.strings);
    }

    function onInvalidToken() {
      $state.go('home');
    }

  }
]);

var confirmedStrings = {
  EN: {
    confirmedCodeMessage: "This code is your entry to the ASICS Hub.",
    reminderMessage: "Make sure you bring it with you.",
    when: "WHEN",
    where: "WHERE",
    date: "AUGUST <span class='txt-bolder'>03RD<span> UNTIL AUGUST <span class='txt-bolder'>21ST<span>",
    time: "FROM <span class='txt-bolder'>12PM</span> TO <span class='txt-bolder'>10PM</span>"
  },
  PT: {
    confirmedCodeMessage: "Esse é seu código para entrar no ASICS Hub",
    reminderMessage: "Certifique-se de trazê-lo com você.",
    when: "QUANDO",
    where: "ONDE",
    date: "<span class='txt-bolder'>03<span> DE AGOSTO ATÉ <span class='txt-bolder'>21<span> DE AGOSTO",
    time: "DAS <span class='txt-bolder'>12H</span> ÀS <span class='txt-bolder'>22H</span>"
  }
};
