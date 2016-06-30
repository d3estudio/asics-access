angular.module('asics').factory('admin', ['$http', function ($http) {
    var o = {};

    o.getGuests = function () {
        return $http.get('/api/admin/guests/all').then(parseSuccess, parseError)
    };

    o.getLogs = function () {
        return $http.get('/api/admin/logs/all').then(parseSuccess, parseError)
    };

    o.postResendEmail = function (guest_id) {
        return $http.post('/api/admin/guests/email', { guest_id: guest_id }).then(parseSuccessMessage, parseError)
    };

    o.postDeleteGuest = function (guest_id) {
        return $http.post('/api/admin/guests/delete', { guest_id: guest_id }).then(parseSuccessMessage, parseError)
    };

    o.postInvite = function(guest) {
        return $http.post('/api/admin/invite', guest).then(parseSuccess, parseError)
    };

    function parseSuccessMessage(response) {
        return response.data.result.message
    }

    function parseSuccess(response) {
        return response.data.result
    }

    function parseError(error) {
        throw error.data.message
    }

    return o;

}]);
