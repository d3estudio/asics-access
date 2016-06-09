angular.module('asics').factory('admin', ['$http', function ($http) {
    var o = {};

    o.getAllAthletes = function () {
        return $http.get('/api/athlete/all')
            .then(
                function (response) {
                    return response.data
                },
                function (error) {
                    return {
                        error: error.data.message
                    }
                })
    };

    return o;

}]);
