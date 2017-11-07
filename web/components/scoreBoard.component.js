import './scoreBoard.module';

angular.module('scoreBoard').component('scoreBoard', {
    templateUrl: './components/scoreBoard.template.html',
    controller: [function ScoreBoardController($scope) {
        let self = this;

        //self.player = "Stephen Krieg";
        self.games = [];

        self.noGames = false;

        self.$onInit = function () {
            if (self.games.length === 0) {
                //we have no games, Remind user that they need to type their name to start one in the "available panel"
                //self.noGames = true;
                for (let i = 0; i <= 3; i++) {
                    let test = {
                        playerName: 'John',
                        gameId: self.games.length,
                        sets: [
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', setTotal: '', scoreTally: 0},
                            {first: '', second: '', third: '', setTotal: '', scoreTally: 0},
                        ],
                        total: 0
                    };

                    self.games.push(test);
                }
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
                console.log(_value);
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
                return 0;
            }
            else {
                return parseInt(_value);
            }
        };

        self.addGame = function (playerName) {
            //No validation required on game objects, or set counts. The only way a new game can be created is by the system. We dont need to validate automated elements, only player input.
            if (!angular.isUndefined(playerName)) {
                let temp = {
                    playerName: playerName,
                    gameId: self.games.length,
                    sets: [
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', setTotal: '', scoreTally: 0},
                        {first: '', second: '', third: '', setTotal: '', scoreTally: 0},
                    ],
                    total: 0
                };

                self.games.push(temp);
            }
            else {
                //Errorhandler->throw(new Error('You must provide a player name in order to create a game'));
            }
        };

        //Validation and update of setScores
        self.updateSetScore = function (gameId, setIndex, setPosition, newScore) {

            let set = self.games[gameId].sets[setIndex];


            if (self.validateGameInput(newScore)) {

                if (setPosition === 1) {
                    //If the newScore is a /(spare) that is incorrect, first index cannot be a spare
                    if (newScore === '/') {
                        self.games[gameId].sets[setIndex].first = '';
                    }
                    //if we get a strike in first frame, we dont get a second shot.
                    else if (newScore === 'X' || newScore === 'x' && setIndex !== 9) {
                        self.games[gameId].sets[setIndex].first = '';
                        self.games[gameId].sets[setIndex].second = newScore;
                    }
                    else if (set.second === 'x' || set.second === 'X') {
                        self.games[gameId].sets[setIndex].first = '';
                    }
                    else {
                        self.games[gameId].sets[setIndex].first = newScore;

                    }
                }
                else if (setPosition === 2) {
                    //If the newScore is a X(strike) we need to clear first set.first value and X set.second unless we are in the 10th frame
                    if (newScore === 'X' || newScore === 'x' && setIndex !== 9) {
                        self.games[gameId].sets[setIndex].first = '';
                        self.games[gameId].sets[setIndex].second = newScore;

                    }
                    else if(newScore === '/') {
                        self.games[gameId].sets[setIndex].second = newScore;
                    }
                    else {
                        self.games[gameId].sets[setIndex].second = newScore;

                    }
                }
                else if (setPosition === 3 && setIndex === 9) {
                    //if there is no X(strike) or /(spare) in 10th frame, bonus roll is NULL
                    if (newScore !== '' && ((set.first === 'x' || set.first === 'X' || set.first === '/') || (set.second === 'x' || set.second === 'X' || set.second === '/'))) {
                        self.games[gameId].sets[setIndex].third = newScore;

                    }
                    else {
                        self.games[gameId].sets[setIndex].third = '';
                    }

                }
                else {
                    //Errorhandler->throw(new Error('There should be no THIRD value for this setIndex'));
                }
                //initiateParse of game totals.
                self.parseSets(gameId, setIndex, newScore);
            }
            else {
                if (setPosition === 1) {
                    self.games[gameId].sets[setIndex].first = '';
                }
                else if (setPosition === 2) {
                    self.games[gameId].sets[setIndex].second = '';
                }
                else if (setPosition === 3 && setIndex === 9) {
                    self.games[gameId].sets[setIndex].third = '';
                }
                else {
                    //Errorhandler->throw(new Error('There should be no THIRD value for this setIndex'));
                }
            }


        };

        self.parseSets = function (gameId, setIndex, newScore) {

            angular.forEach(self.games[gameId].sets, function(set, key) {
                if(setIndex < 9) {
                    set.scoreTally = 0;
                    //if we have a spare or a strike
                    if(set.first === '' && (self.validateStrike(set.second) || self.validateSpare(set.second))) {
                        set.scoreTally = 10;
                        if(self.validateSpare(set.second)) {
                            set.scoreTally += self.returnTotalScoreForNextThrowInterval(gameId, key, 1);
                        }
                        else if(self.validateStrike(set.second)) {
                            set.scoreTally += self.returnTotalScoreForNextThrowInterval(gameId, key, 2);
                        }
                    }
                    else if(set.first !== ''){
                        //set.scoreTally = parseInt(set.first);
                        if(set.second !== '' && (!self.validateStrike(set.second) && !self.validateSpare(set.second))) {
                            set.scoreTally = self.validateNumber(parseInt(set.first)) + self.validateNumber(parseInt(set.second));
                        }
                        else if(self.validateSpare(set.second)) {
                            set.scoreTally = self.validateNumber(parseInt(set.first)) + self.returnTotalScoreForNextThrowInterval(gameId, key, 1);
                        }
                    }


                    if(key === 0) {
                        set.setTotal = set.scoreTally;
                    }
                    else {
                        if(set.first !== '' || set.second !== '') {
                            set.setTotal = set.scoreTally + self.games[gameId].sets[key-1].setTotal;
                        }
                    }



                }
                else {

                    if(key === 8) {
                    if(set.first === '' && (self.validateStrike(set.second) || self.validateSpare(set.second))) {
                        set.scoreTally = 10;
                        if(self.validateSpare(set.second)) {
                            set.scoreTally += self.returnTotalScoreForNextThrowInterval(gameId, 8, 1);
                        }
                        else if(self.validateStrike(set.second)) {
                            set.scoreTally = 10;

                            if(self.validateStrike(self.games[gameId].sets[key+1].first)) {
                                set.scoreTally += 10;
                                if(self.validateStrike(self.games[gameId].sets[key+1].second)) {
                                    set.scoreTally += 10;
                                }
                                else {
                                    set.scoreTally += self.validateNumber(self.games[gameId].sets[key+1].second);
                                }
                            }
                            else {
                                if(self.validateSpare(self.games[gameId].sets[key+1].second)) {
                                    set.scoreTally += 10;
                                }
                                else {
                                    set.scoreTally += self.validateNumber(self.games[gameId].sets[key+1].first) + self.validateNumber(self.games[gameId].sets[key+1].second);
                                }
                            }


                        }
                    }
                    else if(set.first !== ''){
                        //set.scoreTally = parseInt(set.first);
                        if(set.second !== '' && (!self.validateStrike(set.second) && !self.validateSpare(set.second))) {
                            set.scoreTally = self.validateNumber(parseInt(set.first)) + self.validateNumber(parseInt(set.second));
                        }
                        else if(self.validateSpare(set.second)) {
                            set.scoreTally = self.validateNumber(parseInt(set.first)) + self.returnTotalScoreForNextThrowInterval(gameId, 8, 1);
                        }
                    }
                }

                    //if no strike or spare in 10th frame, then no bonus roll
                   if((self.validateStrike(set.first) || self.validateStrike(set.second)) || self.validateSpare(set.second)) {
                       //Bonus roll!
                       if(self.validateStrike(set.first)) {
                           set.scoreTally += 10;
                           if(self.validateStrike(set.second)) {
                               set.scoreTally += 10;
                               if(self.validateStrike(set.third)) {
                                   set.scoreTally += 10;
                               }
                           }
                           else {
                               set.scoreTally += self.validateNumber(parseInt(set.second));
                               console.log(self.validateNumber(parseInt(set.second)));
                               if(self.validateStrike(set.third) || self.validateSpare(set.third)) {
                                   set.scoreTally +=10;
                               }
                               else {
                                   set.scoreTally += self.validateNumber(parseInt(set.third));
                               }
                           }
                       }
                       else if(set.first !== '' && self.validateSpare(set.second)) {
                           set.scoreTally = 10;
                           if(self.validateStrike(set.third) || self.validateSpare(set.third)) {
                               set.scoreTally +=10;
                           }
                       }
                   }
                   else {
                       set.scoreTally = self.validateNumber(parseInt(set.first)) + self.validateNumber(parseInt(set.second));
                   }
                    if(key !== 0) {
                        set.setTotal = set.scoreTally + self.games[gameId].sets[key-1].setTotal;
                    }

                }

                console.log(set.scoreTally);


            });

            //The 10th set will work differently
        };

        self.returnTotalScoreForNextThrowInterval = function(gameId, startIndex, throwIndex) {
            //startIndex = current index that we are polling from
            //throwIndex = how many throws in the future we want to parse, meaning. If throwIndex is 2, then we want to take scores from the next TWO values.

            let throw1Value = 0;
            let throw2Value = 0;

            //This is to check SPARES
            if(throwIndex === 1) {
                let nextIndex = self.games[gameId].sets[startIndex+1];

                if(typeof nextIndex !== 'undefined') {

                    if (nextIndex.first !== '') {
                        throw1Value = self.validateNumber(parseInt(nextIndex.first));
                    }
                    else {
                        if (nextIndex.second !== '') {
                            if (self.validateSpare(nextIndex.second) || self.validateStrike(nextIndex.second)) {
                                throw1Value = 10;
                            }
                        }
                    }
                }

            }
            else if(throwIndex === 2) {
                let nextIndex = self.games[gameId].sets[startIndex+1];
                let nextNextIndex = self.games[gameId].sets[startIndex+2];

                if(typeof nextIndex !== 'undefined'){

                    if(nextIndex.first !== '') {
                        throw1Value = self.validateNumber(parseInt(nextIndex.first));
                        if(nextIndex.second !== '' && !self.validateSpare(nextIndex.second)) {
                            throw2Value = self.validateNumber(parseInt(nextIndex.second));
                        }
                        else {
                            //it is a spare
                            throw2Value = 10;
                        }
                    }
                    else {
                        if(nextIndex.second !== '') {
                            if(self.validateStrike(nextIndex.second) || self.validateSpare(nextIndex.second)) {
                                throw1Value = 10;
                                if(typeof nextNextIndex !== 'undefined') {
                                    if(nextNextIndex.first !== '') {
                                        throw2Value = self.validateNumber(parseInt(nextNextIndex.first));
                                    }
                                    else {
                                        if(self.validateSpare(nextNextIndex.second) || self.validateStrike(nextNextIndex.second)) {
                                            throw2Value = 10;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
            else {
                //IDK it should never not be one of the two above.
            }

            return throw1Value + throw2Value;
        };

        //self.parseSets = function(gameId) {
//
        //    angular.forEach(self.games[gameId].sets, function(set, key) {
        //        if(setIndex < 9) {
        //            set.scoreTally = 0;
        //            //if we have a spare or a strike
        //            if(set.first === '' && (self.validateStrike(set.second) || self.validateSpare(set.second))) {
        //                set.scoreTally = 10;
        //                if(self.validateSpare(set.second)) {
        //                    set.scoreTally += self.returnTotalScoreForNextThrowInterval(gameId, key, 1);
        //                }
        //                else if(self.validateStrike(set.second)) {
        //                    set.scoreTally += self.returnTotalScoreForNextThrowInterval(gameId, key, 2);
        //                }
        //            }
        //            else if(set.first !== ''){
        //                //set.scoreTally = parseInt(set.first);
        //                if(set.second !== '' && (!self.validateStrike(set.second) && !self.validateSpare(set.second))) {
        //                    set.scoreTally = self.validateNumber(parseInt(set.first)) + self.validateNumber(parseInt(set.second));
        //                }
        //                else if(self.validateSpare(set.second)) {
        //                    set.scoreTally = self.validateNumber(parseInt(set.first)) + self.returnTotalScoreForNextThrowInterval(gameId, key, 1);
        //                }
        //            }
//
//
        //            if(key === 0) {
        //                set.setTotal = set.scoreTally;
        //            }
        //            else {
        //                if(set.first !== '' || set.second !== '') {
        //                    set.setTotal = set.scoreTally + self.games[gameId].sets[key-1].setTotal;
        //                }
        //            }
//
//
//
        //        }
        //        else {
//
        //            if(key === 8) {
        //                if(set.first === '' && (self.validateStrike(set.second) || self.validateSpare(set.second))) {
        //                    set.scoreTally = 10;
        //                    if(self.validateSpare(set.second)) {
        //                        set.scoreTally += self.returnTotalScoreForNextThrowInterval(gameId, 8, 1);
        //                    }
        //                    else if(self.validateStrike(set.second)) {
//
        //                        if(self.validateStrike(self.games[gameId].sets[key+1].first)) {
        //                            set.scoreTally += 10;
        //                            if(self.validateStrike(self.games[gameId].sets[key+1].second)) {
        //                                set.scoreTally += 10;
        //                            }
        //                            else {
        //                                set.scoreTally += self.validateNumber(self.games[gameId].sets[key+1].second);
        //                            }
        //                        }
        //                        else {
        //                            if(self.validateSpare(self.games[gameId].sets[key+1].second)) {
        //                                set.scoreTally += 10;
        //                            }
        //                            else {
        //                                set.scoreTally += self.validateNumber(self.games[gameId].sets[key+1].first) + self.validateNumber(self.games[gameId].sets[key+1].second);
        //                            }
        //                        }
//
//
        //                    }
        //                }
        //                else if(set.first !== ''){
        //                    //set.scoreTally = parseInt(set.first);
        //                    if(set.second !== '' && (!self.validateStrike(set.second) && !self.validateSpare(set.second))) {
        //                        set.scoreTally = self.validateNumber(parseInt(set.first)) + self.validateNumber(parseInt(set.second));
        //                    }
        //                    else if(self.validateSpare(set.second)) {
        //                        set.scoreTally = self.validateNumber(parseInt(set.first)) + self.returnTotalScoreForNextThrowInterval(gameId, 8, 1);
        //                    }
        //                }
        //            }
//
        //            //if no strike or spare in 10th frame, then no bonus roll
        //            if((self.validateStrike(set.first) || self.validateStrike(set.second)) || self.validateSpare(set.second)) {
        //                //Bonus roll!
        //                if(self.validateStrike(set.first)) {
        //                    set.scoreTally = 10;
        //                    if(self.validateStrike(set.second)) {
        //                        set.scoreTally += 10;
        //                        if(self.validateStrike(set.third)) {
        //                            set.scoreTally += 10;
        //                        }
        //                    }
        //                    else {
        //                        set.scoreTally += parseInt(set.second);
        //                        if(self.validateStrike(set.third) || self.validateSpare(set.third)) {
        //                            set.scoreTally +=10;
        //                        }
        //                        else {
        //                            set.scoreTally += self.validateNumber(parseInt(set.third));
        //                        }
        //                    }
        //                }
        //                else if(set.first !== '' && self.validateSpare(set.second)) {
        //                    set.scoreTally = 10;
        //                    if(self.validateStrike(set.third) || self.validateSpare(set.third)) {
        //                        set.scoreTally +=10;
        //                    }
        //                }
        //            }
        //            else {
        //                set.scoreTally = self.validateNumber(parseInt(set.first)) + self.validateNumber(parseInt(set.second));
        //            }
        //            if(key !== 0) {
        //                set.setTotal = set.scoreTally + self.games[gameId].sets[key-1].setTotal;
        //            }
//
        //        }
//
        //        console.log(set.scoreTally);
//
//
        //    });

            //The 10th set will work differently
       // }


    }
    ]
});