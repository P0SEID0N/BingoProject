<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateThrowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('throwsController', function (Blueprint $table) {
            $table->increments('throwid');
            $table->integer('setid');
            $table->integer('throwValue');
            $table->timestamps();
        });

        //Schema::table('throwsController', function($table) {
        //    $table->foreign('setid')->references('setid')->on('setsController');
        //});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('throwsController');
    }
}
