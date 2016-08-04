angular.module('asics').controller('ReportCtrl', [
  '$mdToast',
  '$scope',
  '$interval',
  'admin',
  '$stateParams',
  function ($mdToast, $scope, $interval, admin, $stateParams) {
    $scope.strings = {};
    $scope.language = $stateParams.language;
    $scope.country_count = [];

    angular.copy(adminReportStrings[$scope.language], $scope.strings);

    admin.getReport()
      .then(readReportInformation)
      .catch(errorToast);

    function readReportInformation(result) {
      
      console.debug(result.country_count);
      console.debug($scope.country_count);

      angular.copy(result.country_count, $scope.country_count);
    }

    function errorToast(error) {
      var toast = $mdToast.simple()
        .textContent(error)
        .position('top right')
        .hideDelay(3000)
        .theme('error-toast');

      $mdToast.show(toast);
    }
  }
]);

var adminReportStrings = {
  EN: {
    updatedAt: "Updated at",
    noCheckin: "No one has done checkin today",
    noneFound: "No guest found"
  },
  PT: {
    updatedAt: "Atualizado às",
    noCheckin: "Nenhum convidado fez check-in hoje",
    noneFound: "Nenhum convidado encontrado"
  }
};
