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
    $scope.available_dates = [];
    $scope.current_date = [];

    angular.copy(adminReportStrings[$scope.language], $scope.strings);

    function get_reports(day) {
      admin.getReport(day)
        .then(readReportInformation)
        .catch(errorToast);
    }

    createDateList();
    setCurrentDate();

    function createDateList() {
      for (var day = 3; day < 22; day++) {
        $scope.available_dates.push({
          date: day
        });
      }
    }

    function setCurrentDate() {
      var d = new Date();
      var day = d.getDate();

      $scope.current_date = $.grep($scope.available_dates, function(e){ return e.date == day })[0];
    }

    function readReportInformation(result) {
      angular.copy(result.country_count, $scope.country_count);
    }

    $scope.$watch('current_date', function () {
      get_reports($scope.current_date.date)
    });

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
    date: "Day",
    title: "Visitors list",
    description: "Select the date to look up the number of visitors per country on that day."
  },
  PT: {
    date: "Dia",
    title: "Lista de visitantes",
    description: "Selecione a data para pesquisar o número de visitantes por país no dia."
  }
};
