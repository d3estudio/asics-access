angular.module('asics').factory('auth', ['$http', '$window', function ($http, $window) {

    var auth = {};

    auth.saveToken = function (token) {
        $window.localStorage['asics-app-token'] = token;
    };

    auth.getToken = function () {
        return $window.localStorage['asics-app-token'];
    };

    auth.deleteToken = function () {
		delete $window.localStorage['asics-app-token'];
	};

    auth.register = function (user, callback) {
		$http.post('/api/auth/signup', user).success(function (data) {
			auth.saveToken(data.token);
            callback();
		}).error(function(error) {
			auth.logOut();
            callback(error);
		});
    };

    auth.logIn = function (user, callback) {
        $http.post('/api/auth/login', user).success(function (data) {
            auth.saveToken(data.token);
            callback();
        }).error(function(error) {
            auth.logOut();
            callback(error);
        });
    };

	auth.logOut = function (callback) {
		auth.deleteToken();
		if(callback)
			callback();
	};

    return auth;
}]);

angular.module('asics').factory('authInterceptor', [
	'$injector',
	'$q',
	'$window',
	function ($injector, $q, $window) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if ($window.localStorage['asics-app-token']) {
					config.headers.Authorization = 'Bearer ' + $window.localStorage['asics-app-token'];
				}
				//console.log("REQUEST >>>>>");
				//console.log(config);
				return config;
			},
			responseError:  function (response) {
				//console.log(response);
				//console.log("RESPONSE <<<<<");

				if (response.status === 401) {
					$injector.get('auth').logOut();
					return $injector.get('$state').transitionTo('login');
				}

				return $q.reject(response);
			}
		};
	}
]);