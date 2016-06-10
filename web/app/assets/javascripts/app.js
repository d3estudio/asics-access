var asics = angular.module('asics', [
    'ngCookies',
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngMask',
	'monospaced.qrcode'
]);

asics.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    '$mdThemingProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $mdThemingProvider) {
        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('authInterceptor');
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/rsvp/:email/:token',
                templateUrl: 'views/index',
                controller: 'RsvpCtrl'
            })
            .state('admin', {
                url: '/admin',
                redirectTo: 'admin.invitation',
                template: '<ui-view/>'
			})
            .state('admin.invitation', {
                url: '/invitation',
                templateUrl: '/views/admin/invitation',
                controller: 'InvitationCtrl'
            })
            .state('admin.guests', {
                url: '/guests',
                templateUrl: '/views/admin/guests',
                controller: 'GuestsCtrl'
            })
            .state('login', {
                url: '/admin/login',
                templateUrl: 'views/admin/login',
                controller: 'AuthCtrl'
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('blue');
    }
]);


asics.run(['$rootScope', 'auth', '$state', function ($rootScope, auth, $state) {

    // Allows redirects to redirecTo parameter
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
        if (to.redirectTo) {
            evt.preventDefault();
            $state.go(to.redirectTo, params, {location: 'replace'})
        }
    });
    

    //Add fast click on iphones
    if ('addEventListener' in document) {
        $(document).ready(function () {
            FastClick.attach(document.body);
        });
    }

    
    //Listen to routes changes
    // $rootScope.$on('$stateChangeStart',
    //     function (event, toState) {
    //         var urlsAllowed = ['login'],
    //             urlsAdmin = ['admin', 'admin.invitation'];
    //
    //         var loggedIn = auth.getToken();
    //
    //         if (urlsAllowed.indexOf(toState.name) > -1 && loggedIn) {
    //             event.preventDefault();
    //             $state.go('admin.invitation');
    //         } else if (urlsAdmin.indexOf(toState.name) > -1 && !loggedIn) {
    //             event.preventDefault();
    //             $state.go('login');
    //         }
    //     });
}]);
