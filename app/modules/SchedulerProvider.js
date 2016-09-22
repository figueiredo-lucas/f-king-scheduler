angular.module('f.scheduler').provider('schedulerLocale', function () {
    var locale = null;

    this.setLocale = function (locale) {
        this.locale = locale;
        moment.locale(this.locale);
    };

    this.$get = function () {
        return this.locale || moment.locale();
    };
});

