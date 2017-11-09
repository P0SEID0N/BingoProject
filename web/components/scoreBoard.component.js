import './scoreBoard.module';

angular.module('scoreBoard').component('scoreBoard', {
    templateUrl: './components/scoreBoard.template.html',
    controller: ['$scope', '$http', function ScoreBoardController($scope, $http) {
        let self = this;

        //self.player = "Stephen Krieg";
        //self.game =[{}];

       // self.game = [{
       //     playerName: 'test',
       //     frames:[],
       // }];
//
        //self.game[1] = {
        //    playerName: 'test2',
        //    frames:[],
        //};

        //This is game's structure
        //self.game = [{
        //    playerName: 'TEST',
        //    frames: [{
        //        throws: [{
        //            first:0,
        //            second:0,
        //            third:0
        //        }],
        //        score: 0,
        //        frameNum: 0
        //    }]
        //}];
        self.$onInit = function () {

            self.game = [];

           //self.addGame("SUCK MY DICK");
            //for(let i = 0; i<10; i++) {
            //    let temp = {
            //        throws: {
            //            first:0,
            //            second:0,
            //            third:0
            //        },
            //        score: 0,
            //        frameNum: i
            //    };
//
            //    self.game[0].frames.push(temp);
            //}
//
            //for(let j = 0; j<10; j++) {
            //    let temp = {
            //        throws: {
            //            first:0,
            //            second:0,
            //            third:0
            //        },
            //        score: 0,
            //        frameNum: j
            //    };
//
            //    self.game[1].frames.push(temp);
            //}



        };

        self.convertScoreValue = function(_value) {
            if(!isNaN(_value)) {
                return parseInt(_value);
            }
            else if (_value === 'X' || _value === 'x') {
                return 10;
            }
            else if(_value === '/') {
                return 10;
            }
            else if(_value === '-' || _value === 'F' || _value === 'f') {
                return 0;
            }
            else {
                return 0;
            }
        };

        self.validateGameInput = function (_value) {
            //Built to validate user input, we dont want to process any user input that is incorrect or faulty (not bowling scores etc)
            if (_value === 'X' || _value === 'x' || _value === '/' || _value === '-' || _value === 'F' || _value === 'f') {
                return true;
            }
            else if (typeof parseInt(_value) === 'number' && !isNaN(parseInt(_value)) && (parseInt(_value) >= 1 && parseInt(_value) <= 9)) {
                return true;
            }
            else {
                return false;
            }
        };

        self.validateStrike = function (_value) {
            if (_value === 'x' || _value === 'X') {
                return true;
            }
            else {
                return false;
            }
        };

        self.validateSpare = function (_value) {
            if (_value === '/') {
                return true;
            }
            else {
                return false;
            }
        };

        self.validateNumber = function(_value) {
            if(isNaN(parseInt(_value))) {
                return false;
            }
            else {
                return true;
            }
        };

        self.addGame = function (_name) {

               if(_name === '' || _name === undefined) {
                   _name = "Player"+ self.game.length;
               }

               let tempGame = {
                    playerName: _name,
                    frames:[]
                };
                self.game.push(tempGame);

                for(let j = 0; j<10; j++) {
                    let temp = {
                        throws: {
                            first:0,
                            second:0,
                            third:0
                        },
                        score: 0,
                        frameNum: j
                    };

                    self.game[self.game.length - 1].frames.push(temp);
                }

                console.log(self.game);


        };

        self.sendScore = function(_game) {
            console.log(_game);

            let payload = angular.toJson(_game);

            $http({
                method: 'POST',
                url: 'http://localhost:8000/storegame',
                data: payload
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                //BROADCAST A RELOAD TO THE "GAMEHISTORY COMPONENT"
                console.log(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Unable to send score data");
            });
        };

        //calculate the values of the next two throws, add them and return.
        self.nextTwoThrows = function(_currentGame, _currentFrameNum, _currentFrameThrowNum) {

            let nextThrowScore = 0;
            let nextNextThrowScore = 0;

            if(_currentFrameThrowNum === 1) {
                //FirstThrow
                nextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum].throws.second);

                //If the next frame has a strike we cannot count the first throw as a value, we need to count only the second.
                if(!self.validateStrike(_currentGame.frames[_currentFrameNum + 1].throws.second)) {
                    nextNextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.first);
                }
                //If the next frame has a strike in it, we want to count the strike value not the throws.first value
                else {
                    nextNextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.second);
                }
            }
            //If we are calculating starting from the throws.second position
            else {
                //If the next frame has a strike, we need to count that value
                if(!self.validateStrike(_currentGame.frames[_currentFrameNum + 1].throws.second)) {
                    nextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.first);
                    nextNextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.second);
                }
                //If the next frame has a strike in it, we want to count the strike value not the throws.first value
                else {
                    nextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.second);

                    //Now we need to check the NextNEXT frame, for a strike.
                    //IMPORTANT: we need to catch the 9th Frame here, because we cant parse by two, so for the 9th frame, we need to count the throw.third instead.
                    if(_currentFrameNum < 8) {
                        if(!self.validateStrike(_currentGame.frames[_currentFrameNum + 2].throws.second)) {
                            nextNextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 2].throws.first);
                        }
                        else {
                            nextNextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 2].throws.second)
                        }
                    }
                    //IF we are on frame 9, we need to count first and second, no questions, they are guaranteed throws.
                    else {
                        nextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.first);
                        nextNextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.second);
                    }

                }
            }

            return nextThrowScore + nextNextThrowScore;

        };

        //calculate value of the next throw and return.
        self.nextThrow = function(_currentGame, _currentFrameNum, _currentFrameThrowNum) {

            let nextThrowScore = 0;

            if(_currentFrameThrowNum === 1) {
                nextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum].throws.second);
            }
            else {
                //If next frame has a strike, we want to count that instead.
                if(!self.validateStrike(_currentGame.frames[_currentFrameNum + 1].throws.second)) {
                    nextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.first);
                }
                else {
                    nextThrowScore = self.convertScoreValue(_currentGame.frames[_currentFrameNum + 1].throws.second);
                }
            }

            return nextThrowScore;
        };

        //This will go through all of the frames, and all of the frame scores (CALLED ON EVERY UPDATE)
        self.evaluateFrameScores = function() {
            angular.forEach(self.game, function(game, key) {
               angular.forEach(game.frames, function(frame, key2) {
                   //START INTERNAL SCORING
                       frame.score = self.convertScoreValue(frame.throws.first) + self.convertScoreValue(frame.throws.second) + self.convertScoreValue(frame.throws.third);
                   //END INTERNAL SCORING

                   //EVALUATE SCORES THAT NEED TO TAKE OTHER SCORES INTO ACCOUNT
                   //Spares and strikes will only ever show up in the second throw, so we dont need to account for first
                   //Last frame will never need to calculate against future scores
                   if(frame.frameNum !== 9) {
                       if(self.validateStrike(frame.throws.second) || self.validateSpare(frame.throws.second)) {
                           //If the throw is a strike, we need the two next throws.
                           if(self.validateStrike(frame.throws.second)) {
                               //console.log(game.frames);
                               frame.score += self.nextTwoThrows(game, frame.frameNum, 2);
                           }
                           else if(self.validateSpare(frame.throws.second)) {
                               //Spares are worth 10 points in this system, but in reality it is supposed to be the difference between the first shot and 10 points, therefore making the entire set worth 10. So we need to subtract some here.
                               frame.score -= self.convertScoreValue(frame.throws.first);

                               frame.score += self.nextThrow(game, frame.frameNum, 2);
                           }
                       }
                   }

                   //Now we need to take the previous frame score into account.

                   if(frame.frameNum > 0) {
                       frame.score += self.convertScoreValue(game.frames[frame.frameNum - 1].score);
                   }
               });
            });
        };

        self.validateThrowInput = function(_currentGame, _currentFrame, _currentFrameThrowNum, _newThrowValue) {

            //FIRST THROW SLOT
            if(_currentFrameThrowNum === 1) {

                //Parse values and only keep the ones we want.
                if(self.validateGameInput(_newThrowValue)) {
                    //Spare and strike symbols cannot go into the first slot
                    if((self.validateStrike(_newThrowValue) || self.validateSpare(_newThrowValue)) && _currentFrame.frameNum < 9) {
                        if(self.validateStrike(_newThrowValue)) {
                            _currentFrame.throws.first = undefined;
                            _currentFrame.throws.second = _newThrowValue;
                        }
                        else if(self.validateSpare(_newThrowValue)) {
                            _currentFrame.throws.first = undefined;
                        }
                    }
                    else {
                        _currentFrame.throws.first = _newThrowValue;
                    }
                }
                else {
                    _currentFrame.throws.first = undefined;
                }

            }
            else if(_currentFrameThrowNum === 2) {

                if(self.validateGameInput(_newThrowValue)) {
                    if(self.validateSpare(_newThrowValue) || self.validateStrike(_newThrowValue)) {
                        _currentFrame.throws.second = _newThrowValue;
                    }
                }
                else {
                    _currentFrame.throws.second = undefined;
                }
            }
            else if(_currentFrameThrowNum === 3) {
                if(self.validateGameInput(_newThrowValue)) {
                    _currentFrame.throws.third = _newThrowValue;
                }
                else {
                    _currentFrame.throws.third = undefined;
                }
            }
            else {
                _currentFrame.throws.first = undefined;
                _currentFrame.throws.second = undefined;
                _currentFrame.throws.third = undefined;

            }

            self.evaluateFrameScores();

        }
    }
    ]
});