<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFollowersTable extends Migration {

	public function up() {
		Schema::create('followers', function(Blueprint $table) {
            $table->integer('followed_id')->unsigned();
            $table->foreign('followed_id')->references('id')->on('users');

            $table->integer('follower_id')->unsigned();
            $table->foreign('follower_id')->references('id')->on('users');

            $table->primary(['followed_id', 'follower_id']);  

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('followers');
	}


}



