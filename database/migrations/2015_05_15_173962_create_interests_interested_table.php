<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInterestsInterestedTable extends Migration {

    //Polymorphic Many to Many

	public function up() {
		Schema::create('interests_interested', function(Blueprint $table) {
            $table->integer('interest_id')->unsigned();
            $table->integer('interested_id')->unsigned();
            $table->enum('type', ['WINWIN', 'USER', 'SPONSOR']);
		});
	}

	public function down() {
		Schema::drop('interests_interested');
	}


}



