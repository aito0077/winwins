<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoriesTable extends Migration {

	public function up() {
		Schema::create('stories', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->mediumText('title')->nullable();
            $table->mediumText('subtitle')->nullable();
            $table->longText('content');

            $table->boolean('selected')->default(FALSE);
            $table->boolean('removed')->default(FALSE);

            $table->boolean('published')->default(FALSE);
            $table->datetime('published_date')->nullable();

            $table->integer('media_id')->unsigned()->nullable();
            $table->foreign('media_id')->references('id')->on('medias');

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('stories');
	}

}


