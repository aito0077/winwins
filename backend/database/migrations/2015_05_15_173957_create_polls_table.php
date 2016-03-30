<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePollsTable extends Migration {

	public function up() {
		Schema::create('polls', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('winwin_id')->unsigned();
            $table->foreign('winwin_id')->references('id')->on('winwins');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->string('name');
            $table->mediumText('question');

            $table->dateTime('closedate')->nullable();
            $table->boolean('selected')->default(FALSE);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('polls');
	}

}
