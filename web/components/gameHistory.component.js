import './gameHistory.module';

angular.module('gameHistory').component('gameHistory', {
    templateUrl: './components/gameHistory.template.html',
    controller: ['$http','$scope', 'API_ROUTE', function GameHistoryController($http, $scope, API_ROUTE) {
        let self = this;

        self.games = [];

        self.$onInit = function() {
            self.fetchData();
        };

        $scope.$on("GAME_CREATED", function(){
            self.fetchData();
        });

        self.fetchData = function() {

            self.games = [];

            $http({
                method: 'GET',
                url: API_ROUTE+'api/game-history'
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