angular.module('f.scheduler').directive('fKingMonthly', [
    'CalendarService',
    function (CalendarService) {
        return {
            templateUrl: 'modules/monthly/monthly.template.html',
            restrict: 'E',
            replace: true,
            scope: {},
            require: '^fKingScheduler',
            link: function (scope, elem, attr, ctrl) {
                scope.weekdays = CalendarService.getWeekdays();
                scope.abbrWeekdays = CalendarService.getAbbrWeekdays();
                scope.key = CalendarService.directiveConstants.MONTHLY;
                ctrl.registerDirective(scope);
                scope.calendar = CalendarService.createCalendar(ctrl.today.clone());
                scope.calendar[1][1].appointments = ['08:15', '10:15'];
                scope.calendar[1][2].appointments = ['08:15', '10:15'];
                scope.calendar[1][3].appointments = ['08:15', '10:15'];
                scope.calendar[2][1].appointments = ['08:15', '10:15'];
                scope.calendar[3][2].appointments = ['08:15', '10:15'];

                scope.changePage = function (increase) {
                    if (increase) {
                        scope.calendar = CalendarService.createCalendar(ctrl.today.add(1, 'month').clone());
                    } else {
                        scope.calendar = CalendarService.createCalendar(ctrl.today.subtract(1, 'month').clone());
                    }
                };
                
                scope.recalculate = function() {
                    scope.calendar = CalendarService.createCalendar(ctrl.today.clone());
                };

                scope.getClass = function (first, last, date) {
                    return CalendarService.getColSize(first, last)
                            + ' ' + CalendarService.isToday(date)
                            + ' ' + CalendarService.getHeight(scope.calendar.length);
                };
                
                scope.getHeaderClass = function (first, last, abbr) {
                    return CalendarService.getHeaderColSize(first, last, abbr);
                };
            }
        };
    }
]);