<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	public function up() {
		Schema::create('users', function(Blueprint $table) {
			$table->increments('id');

			$table->string('email')->nullable();
			$table->string('password')->nullable();
			$table->string('username')->nullable();
			$table->string('facebook')->nullable();
			$table->string('google')->nullable();
			$table->string('yahoo')->nullable();
			$table->string('twitter')->nullable();

            $table->string('photo')->default('placeholder-square.jpg');

			$table->dateTime('last_access')->nullable();
            $table->boolean('canceled')->default(FALSE);
            $table->boolean('suspend')->default(FALSE);
            $table->boolean('active')->default(FALSE);
            $table->boolean('accept_terms')->default(FALSE);



			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('users');
	}

}
