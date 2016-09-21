angular.module('f.scheduler').directive('fKingDaily', function () {
    return {
        templateUrl: 'modules/daily/daily.template.html',
        restrict: 'E',
        replace: true,
        scope: {
            appointments: '='
        },
        link: function (scope) {
            scope.day = moment();
            scope.dailyShown = false;
            scope.day.appointments = scope.appointments;
        }
    };
});