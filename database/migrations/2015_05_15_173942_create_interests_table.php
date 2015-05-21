<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInterestsTable extends Migration {

	public function up() {
		Schema::create('interests', function(Blueprint $table) {
			$table->increments('id');

            $table->string('name')->nullable();
            $table->mediumtext('description');
            $table->boolean('disabled')->default(FALSE);


			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('interests');
	}


}


