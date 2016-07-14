var asics = angular.module('asics', [
    'ngCookies',
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngMask',
    'AngularPrint',
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
                url: '/',
                templateUrl: '/views/index'
            })
            .state('rsvp', {
                url: '/rsvp',
                redirectTo: 'home',
                template: '<ui-view/>'
            })
            .state('rsvp.confirm', {
                url: '/confirm/:token',
                templateUrl: '/views/rsvp',
                controller: 'RsvpCtrl'
            })
            .state('rsvp.confirmed', {
                url: '/confirmed',
                params: {guest: null},
                templateUrl: '/views/confirmed',
                controller: 'RsvpConfirmedCtrl'
            })
            .state('admin', {
                url: '/admin',
                redirectTo: 'admin.guests',
                templateUrl: '/views/admin/template',
                controller: 'AdminCtrl'
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
            .state('admin.logs', {
                url: '/logs',
                templateUrl: '/views/admin/logs',
                controller: 'LogsCtrl'
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
