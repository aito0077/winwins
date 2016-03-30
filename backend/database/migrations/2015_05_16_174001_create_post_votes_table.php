<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostVotesTable extends Migration {

	public function up() {
		Schema::create('post_votes', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('post_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('posts');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->boolean('positive')->default(TRUE);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('post_votes');
	}

}
