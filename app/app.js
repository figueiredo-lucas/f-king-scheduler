'use strict';

angular.module('f.scheduler', [
    'ui.bootstrap'
]).run(function ($rootScope) {
    moment.locale('pt-BR');
    $rootScope.appoint = [
        {
            hour: '08:15',
            description: 'Cagar'
        },
        {
            hour: '10:15',
            description: 'Escovar dente'
        },
        {
            hour: '12:20',
            tretas: 'Lokas'
        }];
    
});

