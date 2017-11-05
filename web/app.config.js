angular.module('BowlingApp').config(['$routeProvider', '$locationProvider',
    function config($locationProvider, $routeProvider) {


        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({
            templateUrl: 'templates/app.template.html'
        });
    }
]);