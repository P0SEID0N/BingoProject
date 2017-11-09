import './gameHistory.module';

angular.module('gameHistory').component('gameHistory', {
    templateUrl: './components/gameHistory.template.html',
    controller: ['$http','$scope', function GameHistoryController($http, $scope) {
        let self = this;

        self.games = [];

        self.$onInit = function() {
            $http({
                method: 'GET',
                url: 'http://localhost:8000/gamehistory'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Unable to fetch history data")
            });
        }
    }]
});