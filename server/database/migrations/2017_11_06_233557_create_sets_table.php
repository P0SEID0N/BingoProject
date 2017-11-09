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
        Schema::create('sets', function (Blueprint $table) {
            $table->increments('setid');
            $table->integer('games_id')->unsigned();
            $table->integer('setScore');
            $table->timestamps();
            //$table->foreign('games_id')->references('gameid')->on('games');
        });

       Schema::table('sets', function($table) {
           $table->foreign('games_id')->references('gameid')->on('games');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sets');
    }
}
