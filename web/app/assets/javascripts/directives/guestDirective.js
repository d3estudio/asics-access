angular.module('asics').directive('myGuest',  [
    '$interval',
    function($interval) {
        function link(scope, element, attrs) {
            // var timeoutId;
            //
            // function updateTime() {
            //    console.log('funciona')
            // }
            //
            // element.on('$destroy', function() {
            //     $interval.cancel(timeoutId);
            // });
            //
            // // start the UI update process; save the timeoutId for canceling
            // timeoutId = $interval(function() {
            //     updateTime(); // update DOM
            // }, 1000);
        }


        return {
            link: link,
            scope: {
                guest: '=myGuest',
                resend: '&onResend',
                delete: '&onDelete'
            },
            templateUrl: '/views/directives/guest'
        };
    }
]);
