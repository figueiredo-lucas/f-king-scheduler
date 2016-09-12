angular.module('f.scheduler').factory('CalendarService', function () {
    return {
        directiveConstants: {
            MONTHLY: {
                name: 'Mensal',
                value: 1,
                icon: 'glyphicon glyphicon-calendar',
                active: false,
                keyName: 'monthly'
            },
            WEEKLY: {
                name: 'Semanal',
                value: 2,
                icon: 'glyphicon glyphicon-resize-full',
                active: false,
                keyName: 'weekly'
            },
            DAILY: {
                name: 'Diário',
                value: 3
            }
        },
        createCalendar: function (varDay) {
            var month = varDay.month();
            var calendar = [];
            var dayCount = 1;
            var auxDate = varDay.set('date', dayCount);
            var initialWeek = auxDate.week();
            do {
                var week = auxDate.week() - initialWeek;
                if (!calendar[week]) {
                    calendar[week] = [null, null, null, null, null, null, null];
                }
                var cal = {
                    date: auxDate.clone(),
                    dayOfWeek: auxDate.day()
                };
                calendar[week][auxDate.day()] = cal;
                dayCount++;
                auxDate = varDay.set('date', dayCount);
            } while (month === varDay.get('month'));
            return calendar;
        },
        createWeek: function (varDay) {
            var week = varDay.week();
            var calendar = [];
            var auxWeek = varDay.startOf('week');
            do {
                var cal = {
                    date: auxWeek.clone(),
                    dayOfWeek: auxWeek.day()
                };
                calendar[auxWeek.day()] = cal;
                auxWeek = varDay.add(1, 'day');
            } while (week === varDay.week());
            return calendar;
        },
        getColSize: function (first, last) {
            return (first || last) ? 'col-md-1 col-xs-1' : 'col-md-2 col-xs-2';
        },
        getHeaderColSize: function (first, last, abbr) {
            if(abbr){
                return (first || last) ? 'col-xs-1' : 'col-xs-2';
            }
            return (first || last) ? 'col-md-1' : 'col-md-2';
        },
        isToday: function (date) {
            if (date) {
                return date.isSame(moment(), 'day') ? 'bg-info' : '';
            }
        },
        getHeight: function (length) {
            return 'altura-' + length + '-col';
        },
        getWeekdays: function () {
            var weekdays = [];
            for (var i = 0; i < 7; i++) {
                weekdays.push(moment().weekday(i).format("dddd").replace("-feira", ""));
            }
            return weekdays;
        },
        getAbbrWeekdays: function () {
            var weekdays = [];
            for (var i = 0; i < 7; i++) {
                weekdays.push(moment().weekday(i).format("ddd"));
            }
            return weekdays;
        }
    };
});