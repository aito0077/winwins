<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTranslateValuesTable extends Migration {

	public function up() {
		Schema::create('translate_values', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('language_id')->unsigned();
            $table->foreign('language_id')->references('id')->on('languages');
            $table->integer('namespace_id')->unsigned();
            $table->foreign('namespace_id')->references('id')->on('translate_namespaces');

            $table->mediumText('text');  

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('translate_values');
	}


}



