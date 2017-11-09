<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('gameid');
            $table->integer('users_id')->unsigned()->nullable();
            $table->integer('totalScore');
            $table->timestamps();
//
            //$table->foreign('users_id')->references('userid')->on('users');
        });

        //Schema::table('games', function($table) {
        //    $table->foreign('userid')->references('userid')->on('users');
        //});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
