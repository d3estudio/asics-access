angular.module('asics').factory('admin', ['$http', function ($http) {
    var o = {
        entries: []
    };

    o.getAllConferences = function () {
        return $http.get('/api/conference/all')
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

    o.getEntries = function (confID) {
        return $http.get('/api/admin/conference/entries?conferenceId=' + confID)
            .then(
                function (response) {
                    return response.data.entries
                },
                function (error) {
                    return {
                        error: error.data.message
                    }
                })
    };

    o.getGroup = function (groupId) {
        return $http.get('/api/admin/group?groupId=' + groupId)
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