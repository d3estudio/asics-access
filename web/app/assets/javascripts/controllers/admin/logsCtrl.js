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

        $scope.deleteGuest = function (guest_id) {
            admin.postDeleteGuest(guest_id)
                .then(onDeleteGuest)
                .catch(errorToast)
        };

        function onDeleteGuest(result) {
            $scope.guests.splice(map[result.guest.id], 1);
            map[result.guest.id] = undefined;
            successToast(result);
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
