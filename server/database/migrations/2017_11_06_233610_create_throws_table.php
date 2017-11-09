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
        Schema::create('throws', function (Blueprint $table) {
            $table->increments('throwid');
            $table->integer('sets_id')->unsigned();
            $table->char('throwValue', 2)->nullable();
            $table->timestamps();
            $table->foreign('sets_id')->references('setid')->on('sets');
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
        Schema::dropIfExists('throws');
    }
}
