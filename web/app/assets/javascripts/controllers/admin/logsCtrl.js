angular.module('asics').controller('LogsCtrl', [
    '$mdToast',
    '$scope',
    'admin',
    function ($mdToast, $scope, admin) {
        $scope.searchText = '';
        $scope.logs = [];

        angular.copy(admin.logs, $scope.logs);

        admin.getLogs()
          .then(readLogs)
          .catch(errorToast);

        function readLogs() {
            angular.copy(admin.logs, $scope.logs);
        }

        var searchTimeout;
        $scope.$watch('searchText', function() {
            clearTimeout(searchTimeout);
            if($scope.searchText)
                searchTimeout = setTimeout(applySearch, 400)
            else {
                readLogs();
            }
        });

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
    }
]);
