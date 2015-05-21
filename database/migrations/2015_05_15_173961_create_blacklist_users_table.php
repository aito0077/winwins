<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlackListUsersTable extends Migration {

	public function up() {
		Schema::create('blacklist_users', function(Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('blocked_user_id')->unsigned();
            $table->foreign('blocked_user_id')->references('id')->on('users');
            $table->primary(['user_id', 'blocked_user_id']);  

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('blacklist_users');
	}

}

