<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSponsorsTable extends Migration {

	public function up() {
		Schema::create('sponsors', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->string('name')->nullable();

            $table->longText('about')->nullable();

            $table->string('contact_name')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();

            $table->string('type')->nullable();

            $table->mediumtext('cover_photo');
            $table->mediumtext('photo');

            $table->boolean('is_main')->default(false);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('sponsors');
	}

}

