<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('setsController', function (Blueprint $table) {
            $table->increments('setid');
            $table->integer('gameid');
            $table->integer('setScore');
            $table->timestamps();
        });

        //Schema::table('setsController', function($table) {
        //    $table->foreign('gameid')->references('gameid')->on('games');
        //});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('setsController');
    }
}
