import './gameHistory.module';

angular.module('gameHistory').component('gameHistory', {
    templateUrl: './components/gameHistory.template.html',
    controller: ['$http','$scope', function GameHistoryController($http, $scope) {
        let self = this;

        self.games = [];

        self.$onInit = function() {


            $http({
                method: 'GET',
                url: 'http://www.localhost:8000/api/game-history'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                //self.games.push(response.data);
                angular.forEach(response.data, function(value, key) {
                    self.games.push(value);
                });
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Unable to fetch history data")
            });
        }
    }]
});