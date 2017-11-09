<?php

namespace App\Http\Controllers;

use App\games;
use App\sets;
use App\throws;

use Illuminate\Http\Request;

class gamesController extends Controller
{
    public function storeNewGame(Request $request) {

        $frames = $request->get('frames');

        if($request->get('playerName') && $frames && $frames[9]) {

            $newGame = new games();
            $newGame->playerName = $request->get('playerName');
            $newGame->totalScore = $frames[9]['score'];


            if($newGame->save()) {

                foreach ($frames as $frame) {


                    $tempSet = new sets();
                    //$tempSet->gameid = $newGame->id;
                    $tempSet->setScore = $frame['score'];
                    if($newGame->sets()->save($tempSet)) {
//
                        $tempThrowFirst = new throws();

                        if(isset($frame['throws']['first'])){
                            $tempThrowFirst->throwValue = $this->convertScoreValue($frame['throws']['first']);
                        }
                        else {
                            $tempThrowFirst->throwValue = 0;
                        }

                        $tempSet->throws()->save($tempThrowFirst);
//
                        $tempThrowSecond = new throws();

                        if(isset($frame['throws']['second'])){
                            $tempThrowSecond->throwValue = $this->convertScoreValue($frame['throws']['second']);
                        }
                        else {
                            $tempThrowSecond->throwValue = 0;
                        }

                        $tempSet->throws()->save($tempThrowSecond);
//
                        $tempThrowThird = new throws();

                        if(isset($frame['throws']['third'])){
                            $tempThrowThird->throwValue = $this->convertScoreValue($frame['throws']['third']);
                        }
                        else {
                            $tempThrowThird->throwValue = 0;
                        }

                        $tempSet->throws()->save($tempThrowThird);
//

                    }
                }

                return $newGame;

            }

        }
        return "You must provide these values";

    }

    public function convertScoreValue($_value) {
        if($_value === 'x' || $_value === 'X' || $_value === '/') {
            return 10;
        }
        else{
            return 0;
        }
    }

    public function getGames() {

        $games = games::all();
        //$payload[] = array();
//
        //foreach($games as $game) {
//
        //    $payloadGame = array(
        //      'game' => $game,
        //      "frames" => array(
        //          "throws" => array(),
        //          "score" => 0,
        //          "frameNum" => 0
        //      )
        //    );
//
        //    $payloadGame['frames'] = $game->sets();
        //    foreach($payloadGame['frames'] as $frame) {
        //        $frame['throws'] = $frame->throws();
        //    }
//
        //    array_push($payload, $payloadGame);
//
        //}

       // print_r(json_encode($payload));



        return $games;
    }
}
