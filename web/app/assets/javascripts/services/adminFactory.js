angular.module('asics').factory('admin', ['$http', function ($http) {
    var o = {};

    o.getGuests = function () {
        return $http.get('/api/admin/guests')
            .then(
                function (response) {
                    return response.data.result
                },
                function (error) {
                    return {
                        error: error.data.message
                    }
                })
    };

    o.postInvite = function(guest) {
        return $http.post('/api/admin/invite', guest)
            .then(
                function(response) {
                    return response.data.result
                },
                function (error) {
                    throw error.data.message
                }
            )
    };

    return o;

}]);
