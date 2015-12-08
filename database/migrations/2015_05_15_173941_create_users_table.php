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
            $table->string('cover_photo')->default('ww-main-default.jpg');

			$table->dateTime('last_access')->nullable();
            $table->boolean('canceled')->default(FALSE);
            $table->string('cancel_reason')->nullable();
            $table->boolean('suspend')->default(FALSE);
            $table->boolean('active')->default(FALSE);
            $table->boolean('accept_terms')->default(FALSE);

			$table->string('displayname')->nullable();
            $table->integer('followers_amount')->unsigned();
            $table->integer('winwins_amount')->unsigned();

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('users');
	}

}
