angular.module('asics').directive('myLog',  [
    '$interval',
    function($interval) {
        return {
            link: link,
            scope: {
                search: '=',
                log: '=myLog',
                delete: '&onDelete'
            },
            templateUrl: '/views/directives/log'
        };

        var scope, timeoutId, segundo, minuto, hora, dia, mes, ano;

        function link(injScope, element, attrs) {
            scope = injScope;

            segundo = 1000;
            minuto = 60 * segundo;
            hora = 60 * minuto;
            dia = 24 * hora;
            mes = 30 * dia;
            ano = 365 * dia;

            updateTime();

            element.on('$destroy', function() {
                clearTimeout(timeoutId);
            });
        }

        function updateTime() {
          var logTime = new Date(scope.log.created_at);
          var now = new Date();
          var diff = now - logTime;

          if(diff < 0) return scope.relativeTime = 'futuro'

          if(diff < minuto) {
            var value = Math.floor(diff / segundo);
            var text = ' seg' + (value > 1 ? 's' : '');
            setSecondTimeout();
          } else if(diff < hora) {
            var value = Math.round(diff / minuto);
            var text = ' min' + (value > 1 ? 's' : '');
            setMinuteTimeout();
          } else if(diff < dia) {
            var value = Math.round(diff / hora);
            var text = ' hora' + (value > 1 ? 's' : '');
            clearTimeout(timeoutId);
          } else if(diff < mes) {
            var value = Math.round(diff / dia);
            var text = ' dia' + (value > 1 ? 's' : '');
            clearTimeout(timeoutId);
          } else if(diff < ano) {
            var value = Math.round(diff / mes);
            var text = ' mes' + (value > 1 ? 'es' : '');
            clearTimeout(timeoutId);
          } else {
            var value = Math.round(diff / ano);
            var text = ' ano' + (value > 1 ? 's' : '');
            clearTimeout(timeoutId);
          }

          scope.relativeTime = value + text;
        }

        function  setSecondTimeout() {
            clearTimeout(timeoutId);
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, segundo);
        }

        function setMinuteTimeout() {
            clearTimeout(timeoutId);
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, minuto);
        }
    }
]);
