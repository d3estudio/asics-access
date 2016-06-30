angular.module('asics').controller('LogsCtrl', [
    '$mdToast',
    '$scope',
    'admin',
    function ($mdToast, $scope, admin) {
        $scope.logs = [];

        admin.getLogs()
          .then(readLogs)
          .catch(errorToast);

        function readLogs(result) {
          angular.copy(JSON.parse(result.logs), $scope.logs);
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
