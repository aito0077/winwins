<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration {

	public function up() {
		Schema::create('posts', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('reference_id')->unsigned();

            $table->enum('type', ['WINWIN', 'GROUP', 'WW_COMMENT', 'USER_TESTIMONIAL']);

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->mediumText('title');
            $table->longText('content');

            $table->boolean('canceled')->default(FALSE);


			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('posts');
	}

}

