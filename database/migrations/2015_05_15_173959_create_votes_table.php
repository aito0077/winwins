<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVotesTable extends Migration {

	public function up() {
		Schema::create('poll_votes', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('answer_id')->unsigned();
            $table->foreign('answer_id')->references('id')->on('poll_answers');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');


            $table->longText('content');

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('poll_votes');
	}

}
