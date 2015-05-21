<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnswersTable extends Migration {

	public function up() {
		Schema::create('poll_answers', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('poll_id')->unsigned();
            $table->foreign('poll_id')->references('id')->on('polls');


            $table->longText('content');

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('poll_answers');
	}


}

