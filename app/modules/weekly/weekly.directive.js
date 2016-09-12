angular.module('f.scheduler').directive('fKingWeekly', [
    'CalendarService',
    function (CalendarService) {
        return {
            templateUrl: 'modules/weekly/weekly.template.html',
            restrict: 'E',
            require: '^fKingScheduler',
            replace: true,
            scope: {},
            link: function (scope, elem, attr, ctrl) {
                scope.weekdays = CalendarService.getWeekdays();
                scope.abbrWeekdays = CalendarService.getAbbrWeekdays();
                scope.key = CalendarService.directiveConstants.WEEKLY;
                ctrl.registerDirective(scope);
                scope.week = CalendarService.createWeek(ctrl.today.clone());
                scope.week[1].appointments = ['08:15', '10:15', '12:20', '14:45', '16:20', '18:45'];
                scope.week[2].appointments = ['08:15', '10:15'];
                scope.week[3].appointments = ['08:15', '10:15'];
                scope.week[0].appointments = ['08:15', '10:15'];
                scope.week[5].appointments = ['08:15', '10:15'];

                scope.changePage = function (increase) {
                    if (increase) {
                        scope.week = CalendarService.createWeek(ctrl.today.add(1, 'week').clone());
                    } else {
                        scope.week = CalendarService.createWeek(ctrl.today.subtract(1, 'week').clone());
                    }
                };
                
                scope.recalculate = function() {
                    var clonedDate = ctrl.today.startOf('month').clone();
                    var today = moment();
                    if(clonedDate.isSame(today, 'month')) {
                        while(!clonedDate.isSame(today, 'week')) {
                            clonedDate.add(1, 'week');
                            ctrl.today.add(1, 'week');
                        }
                    }
                    scope.week = CalendarService.createWeek(clonedDate);
                };

                scope.getClass = function (fist, last, date) {
                    return CalendarService.getColSize(fist, last)
                            + ' ' + CalendarService.isToday(date)
                            + ' ' + wrongMonth(date);
                };
                
                scope.getHeaderClass = function (first, last, abbr) {
                    return CalendarService.getHeaderColSize(first, last, abbr);
                };

                var wrongMonth = function (date) {
                    if (date) {
                        return !date.isSame(ctrl.today, 'month') ? 'bg-warning' : '';
                    }
                };
            }
        };
    }
]);