angular.module('asics').directive('myLog',  [
    '$interval',
    function($interval) {
        function link(scope, element, attrs) {
            var timeoutId;
            var segundo = 1000;
            var minuto = 60 * segundo;
            var hora = 60 * minuto;
            var dia = 24 * hora;
            var mes = 30 * dia;
            var ano = 365 * dia;

            function updateTime() {
              var logTime = new Date(scope.log.created_at);
              var now = new Date();
              var diff = now - logTime;

              if(diff < minuto) {
                var value = Math.floor(diff / segundo);
                var text = ' seg' + (value > 1 ? 's' : '');
              } else if(diff < hora) {
                var value = Math.round(diff / minuto);
                var text = ' min' + (value > 1 ? 's' : '');
                setMinuteTimeout();
              } else if(diff < dia) {
                var value = Math.round(diff / hora);
                var text = ' hora' + (value > 1 ? 's' : '');
                cancelTimeout();
              } else if(diff < mes) {
                var value = Math.round(diff / dia);
                var text = ' dia' + (value > 1 ? 's' : '');
                cancelTimeout();
              } else if(diff < ano) {
                var value = Math.round(diff / mes);
                var text = ' mes' + (value > 1 ? 'es' : '');
                cancelTimeout();
              } else {
                var value = Math.round(diff / ano);
                var text = ' ano' + (value > 1 ? 's' : '');
                cancelTimeout();
              }

              scope.relativeTime = value + text;
            }

            function setMinuteTimeout() {
              cancelTimeout();
              timeoutId = $interval(function() {
                  updateTime(); // update DOM
              }, minuto);
            }

            function cancelTimeout() {
              $interval.cancel(timeoutId);
            }

            element.on('$destroy', function() {
                cancelTimeout();
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, segundo);
        }


        return {
            link: link,
            scope: {
                log: '=myLog',
                delete: '&onDelete'
            },
            templateUrl: '/views/directives/log'
        };
    }
]);
