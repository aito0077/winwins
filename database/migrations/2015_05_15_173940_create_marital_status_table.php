<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaritalStatusTable extends Migration {

	public function up() {
		Schema::create('marital_status', function(Blueprint $table) {
			$table->increments('id');

            $table->string('name')->nullable();
            $table->mediumtext('description');
            $table->boolean('disabled')->default(FALSE);


			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('marital_status');
	}


}



