angular.module('asics').controller('GuestsCtrl', [
  '$mdToast',
  '$scope',
  'admin',
  '$stateParams',
  function ($mdToast, $scope, admin, $stateParams) {
    $scope.strings = {};
    $scope.language = $stateParams.language;
    $scope.searchText = '';
    $scope.cardIsClosed = true;
    $scope.guests = [];
    $scope.count = {
      all: {total: 0, confirmed: 0, remaining: 0},
      athletes: {total: 0, confirmed: 0, remaining: 0},
      normal: {total: 0, confirmed: 0, remaining: 0}
    };

    var map = {};

    updateStrings();

    function updateStrings() {
      angular.copy(adminGuestsStrings[$scope.language], $scope.strings);
    }

    $scope.$watch('language', function () {
      updateStrings();
    });

    readGuestsInformation();

    admin.getGuests()
      .then(readGuestsInformation)
      .catch(errorToast);

    function readGuestsInformation() {
      updateGuests(admin.guests);
      angular.copy(admin.guestsCount, $scope.count);
    }

    function updateGuests(guests) {
      angular.copy(guests, $scope.guests);
      map = {};
      $scope.guests.forEach(mapObject);
    }

    function mapObject(element, index) {
      map[element.id] = index;
    }

    var searchTimeout;
    $scope.$watch('searchText', onSearchTextChanged);

    function onSearchTextChanged() {
      clearTimeout(searchTimeout);

      if ($scope.searchText)
        searchTimeout = setTimeout(applySearch, 400);
      else
        readGuestsInformation();
    }

    function applySearch() {
      admin.postSearchGuests($scope.searchText)
        .then(readSearchGuests)
        .catch(errorToast);
    }

    function readSearchGuests(result) {
      updateGuests(result.guests);
    }

    function onDeleteGuest(result) {
      $scope.guests.splice(map[result.guest.id], 1);
      map[result.guest.id] = undefined;
      successToast('Usuário ' + result.guest.name + " revogado com sucesso.");
    }

    function successToast(message) {
      var simpleToast = $mdToast.simple()
        .textContent(message)
        .position('top right')
        .hideDelay(3000)
        .theme('success-toast')

      $mdToast.show(simpleToast);
    }

    function errorToast(error) {
      var simpleToast = $mdToast.simple()
        .textContent("Erro ao enviar convite: " + error)
        .position('top right')
        .hideDelay(3000)
        .theme('error-toast')

      $mdToast.show(simpleToast);
    }

    function onResendEmail(result) {
      var guest = result.guest;
      var i = map[guest.id];
      angular.copy(guest, $scope.guests[i]);
      successToast(result.message);
    }

    $scope.resendEmail = function (guest_id) {
      admin.postResendEmail(guest_id)
        .then(onResendEmail)
        .catch(errorToast)
    };

    $scope.deleteGuest = function (guest_id) {
      admin.postDeleteGuest(guest_id)
        .then(onDeleteGuest)
        .catch(errorToast)
    };

    $scope.openCloseCard = function () {
      if ($scope.cardIsClosed ? $scope.cardIsClosed = false : $scope.cardIsClosed = true);
    };
  }
]);

var adminGuestsStrings = {
  EN: {
    totalConfirmations: "Total Confirmations",
    totalAthletesConfirmations: "Athletes confirmed",
    totalGuestsConfirmations: "Guests confirmed",
    sentInvitations: "sent invitations",
    pendingInvitations: "pending invitations",
    music: "music",
    codes: "codes",
    code: "code",
    generated: "generated",
    waiting: "Waiting",
    confirmation: "confirmation",
    attendance: "Attendance",
    confirmed: "confirmed",
    resend: "Resend",
    invitation: "invitation",
    revoke: "Revoke",
    access: "access"
  },
  PT: {
    totalConfirmations: "Confirmações totais",
    totalAthletesConfirmations: "Atletas confirmados",
    totalGuestsConfirmations: "Convidados confirmados",
    sentInvitations: "convites enviados",
    pendingInvitations: "convites pendentes",
    music: "música",
    codes: "códigos",
    code: "código",
    generated: "gerados",
    waiting: "Aguardando",
    confirmation: "confirmação",
    attendance: "Presença",
    confirmed: "confirmada",
    resend: "Reenviar",
    invitation: "convite",
    revoke: "Revogar",
    access: "acesso"
  }
};
