<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationsTable extends Migration {

	public function up() {
		Schema::create('locations', function(Blueprint $table) {
			$table->increments('id');

            $table->string('google_id');
            $table->string('place_id');
            $table->string('name');
 
            $table->string('sublocality');
            $table->string('locality');

            $table->string('administrative_area_level_2');
            $table->string('administrative_area_level_1');
            $table->string('country');
            $table->string('formatted_address');

            $table->string('latitude');
            $table->string('longitude');

            $table->boolean('disabled')->default(FALSE);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('locations');
	}


}

