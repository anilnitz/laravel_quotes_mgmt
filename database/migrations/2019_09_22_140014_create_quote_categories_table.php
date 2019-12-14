<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuoteCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quote_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('category');
            $table->text('description');
            $table->string('dates',10);           
            //$table->integer('user_id')->nullable();
			
			$table->unsignedInteger('user_id');

			$table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quote_categories');
    }
}
