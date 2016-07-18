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
      angular.copy(confirmedPrintStrings[guest.language], $scope.strings);
    }

    function onInvalidToken() {
      $state.go('home');
    }

  }
]);

var confirmedPrintStrings = {
  EN: {
    confirmedCodeMessage: "This code is your entry to the ASICS Hub.",
    reminderMessage: "Make sure you bring it with you.",
    when: "WHEN",
    where: "WHERE",
    date: "AUGUST <strong>03RD</strong> UNTIL AUGUST <strong>21ST</strong>",
    time: "FROM <strong>12PM</strong> TO <strong>10PM</strong>"
  },
  PT: {
    confirmedCodeMessage: "Esse é seu código para entrar no ASICS Hub",
    reminderMessage: "Certifique-se de trazê-lo com você.",
    when: "QUANDO",
    where: "ONDE",
    date: "<strong>03</strong> DE AGOSTO ATÉ <strong>21</strong> DE AGOSTO",
    time: "DAS <strong>12H</strong> ÀS <strong>22H</strong>"
  }
};
