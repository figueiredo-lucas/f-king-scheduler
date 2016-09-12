angular.module('f.scheduler').directive('fKingScheduler', [
    'CalendarService',
    function (CalendarService) {
        
        return {
            templateUrl: 'modules/scheduler/scheduler.template.html',
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function ($scope) {
                this.today = moment();

                this.registerDirective = function (directiveScope) {
                    if (directiveScope.key === CalendarService.directiveConstants.DAILY) {
                        throw 'Daily directive can\'t be used within scheduler directive';
                    }
                    if (alreadyRegistered(directiveScope)) {
                        throw directiveScope.key.name + ' directive can\'t be registered more than once';
                    }
                    registerValidDirective(directiveScope);
                };

                $scope.registeredDirectives = [];
                $scope.today = this.today;

                var alreadyRegistered = function (directiveScope) {
                    return _.includes($scope.registeredDirectives, function (directive) {
                        return directive.key === directiveScope.key;
                    });
                };

                var registerValidDirective = function (directiveScope) {
                    if (directiveScope.key.value === CalendarService.directiveConstants.MONTHLY.value) {
                        directiveScope.key.active = true;
                    }
                    $scope.registeredDirectives.push({
                        key: directiveScope.key,
                        scope: directiveScope
                    });
                };

                $scope.changePage = function (next) {
                    console.log($scope.registeredDirectives);
                    var directive = _.find($scope.registeredDirectives, {key: {active: true}});
                    if (directive) {
                        directive.scope.changePage(next);
                    }
                };

                $scope.changeType = function (key) {
                    _.each($scope.registeredDirectives, function (directive) {
                        directive.key.active = false;
                        if (directive.key.value === key.value) {
                            directive.key.active = true;
                            directive.scope.recalculate();
                        }
                    });
                };
            }
        };
    }
]);