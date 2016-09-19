angular.module('f.scheduler').directive('fKingDaily', [
    'CalendarService',
    function (CalendarService) {
        return {
            templateUrl: 'modules/daily/daily.template.html',
            restrict: 'E',
            replace: true,
            scope: {},
            link: function (scope) {
                scope.day = moment();
                scope.dailyShown = false;
                scope.day.appointments = ['08:15', '10:15', '12:20', '14:45', '16:20', '18:45'];
            }
        };
    }
]);