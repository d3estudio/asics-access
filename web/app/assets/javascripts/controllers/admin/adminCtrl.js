angular.module('asics').controller('AdminCtrl', [
    '$scope',
    '$state',
    function ($scope, $state) {
        $scope.selectedTab = null;

        switch ($state.current.name) {
            case 'admin.logs':
                $scope.selectedTab = 2;
                break;
            case 'admin.invitation':
                $scope.selectedTab = 1;
                break;
            default:
                $scope.selectedTab = 0
        }

        $scope.updateTab = function (tabNumber) {
            $scope.selectedTab = tabNumber;
        };

    }]);
