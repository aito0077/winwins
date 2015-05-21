<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWinwinsUsersTable extends Migration {

	public function up() {
		Schema::create('winwins_users', function(Blueprint $table) {
            $table->integer('winwin_id')->unsigned();
            $table->foreign('winwin_id')->references('id')->on('winwins');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->primary(['winwin_id', 'user_id']);  

            $table->boolean('moderator')->default(FALSE);

            $table->integer('process_rate')->default(0);
            $table->integer('materialized_rate')->default(0);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('winwins_users');
	}


}



