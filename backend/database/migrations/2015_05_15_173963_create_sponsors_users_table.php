<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSponsorsUsersTable extends Migration {

	public function up() {
		Schema::create('sponsors_users', function(Blueprint $table) {
            $table->integer('sponsor_id')->unsigned();
            $table->foreign('sponsor_id')->references('id')->on('sponsors');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->primary(['sponsor_id', 'user_id']);  

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('sponsors_users');
	}


}




