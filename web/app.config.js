import angular from 'angular'

angular.module('BowlingApp').config(['$routeProvider', '$locationProvider',
    function config($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('!');

        $routeProvider.when('/', {
            template: '<score-board></score-board>'
        }).otherwise({
            template: '<div class="row">\n' +
            '    <div class="col s12 m12">\n' +
            '        <div class="card blue-grey darken-1">\n' +
            '            <div class="card-content white-text">\n' +
            '                <span class="card-title">You have likely encountered an error please contact the site administrator</span>\n' +
            '\n' +
            '                <p>Please contact the site admin via this email: support@krieg.ca</p>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
        });
    }
]);