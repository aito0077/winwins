<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration {

	public function up() {
		Schema::create('posts', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('reference_id')->unsigned();

            $table->enum('type', ['WINWIN', 'GROUP', 'WW_COMMENT', 'USER', 'USER_TESTIMONIAL', 'DASHBOARD']);

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->mediumText('title')->nullable();
            $table->longText('content');

            $table->boolean('canceled')->default(FALSE);
            $table->boolean('allow_voting')->default(FALSE);

            $table->boolean('sticky')->default(FALSE);
            $table->datetime('sticky_date')->nullable();

            $table->integer('media_id')->unsigned()->nullable();
            $table->foreign('media_id')->references('id')->on('medias');

            /* Address - Geo ? 
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            */


			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('posts');
	}

}

