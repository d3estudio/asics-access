angular.module('asics').directive('myLog', [
  function () {
    return {
      link: link,
      scope: {
        search: '=',
        log: '=myLog',
        delete: '&onDelete'
      },
      templateUrl: '/views/directives/log'
    };

    function link(scope, element, attrs) {
      updateTime(scope);

      scope.$watch('log.created_at', function () {
        updateTime(scope);
      })
    }

    function updateTime(scope) {
      var segundo = 1000,
        minuto = 60 * segundo,
        hora = 60 * minuto,
        dia = 24 * hora,
        mes = 30 * dia,
        ano = 365 * dia;

      var logTime = new Date(scope.log.created_at);
      var now = new Date();
      var diff = now - logTime;

      if (diff < 0) return scope.relativeTime = 'futuro'

      if (diff < minuto) {
        var value = Math.floor(diff / segundo);
        var text = ' seg' + (value > 1 ? 's' : '');
      } else if (diff < hora) {
        var value = Math.round(diff / minuto);
        var text = ' min' + (value > 1 ? 's' : '');
      } else if (diff < dia) {
        var value = Math.round(diff / hora);
        var text = ' hora' + (value > 1 ? 's' : '');
      } else if (diff < mes) {
        var value = Math.round(diff / dia);
        var text = ' dia' + (value > 1 ? 's' : '');
      } else if (diff < ano) {
        var value = Math.round(diff / mes);
        var text = ' mes' + (value > 1 ? 'es' : '');
      } else {
        var value = Math.round(diff / ano);
        var text = ' ano' + (value > 1 ? 's' : '');
      }

      scope.relativeTime = value + text;
    }
  }
]);
