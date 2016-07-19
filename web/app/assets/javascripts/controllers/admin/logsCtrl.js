angular.module('asics').controller('LogsCtrl', [
  '$mdToast',
  '$scope',
  '$interval',
  'admin',
  '$stateParams',
  function ($mdToast, $scope, $interval, admin, $stateParams) {
    $scope.strings = {};
    $scope.language = $stateParams.language;
    $scope.searchText = '';
    $scope.listUpdatedAt = new Date();
    $scope.logs = [];

    angular.copy(adminLogsStrings[$scope.language], $scope.strings);

    var searchTimeout;
    var searchInterval;

    angular.copy(admin.logs, $scope.logs);
    updateLogs();

    function updateLogs() {
      admin.getLogs()
        .then(readLogs)
        .catch(errorToast);
    }

    function readLogs() {
      angular.copy(admin.logs, $scope.logs);
      $scope.listUpdatedAt = new Date();
    }

    function applySearch() {
      admin.postSearchLogs($scope.searchText)
        .then(readSearchLogs)
        .catch(errorToast);
    }

    function readSearchLogs(result) {
      angular.copy(result.logs, $scope.logs);
    }

    function errorToast(error) {
      var toast = $mdToast.simple()
        .textContent(error)
        .position('top right')
        .hideDelay(3000)
        .theme('error-toast');

      $mdToast.show(toast);
    }

    function stopInterval() {
      $interval.cancel(searchInterval);
    }

    $scope.$watch('searchText', function () {
      clearTimeout(searchTimeout);
      if ($scope.searchText)
        searchTimeout = setTimeout(applySearch, 400);
      else {
        readLogs();
      }
    });

    $scope.$on('$destroy', function () {
      stopInterval();
    });

    stopInterval();
    searchInterval = $interval(function () {
      updateLogs();
    }, 45 * 1000);
  }
]);

var adminLogsStrings = {
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
