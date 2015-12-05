<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTranslateNamespacesTable extends Migration {

	public function up() {
		Schema::create('translate_namespaces', function(Blueprint $table) {
			$table->increments('id');
            $table->enum('type', ['EMAIL', 'MOBILE', 'WEB', 'NOTIFICATION', 'SETTING', 'GLOBAL'])->default('GLOBAL');
            $table->string('module');
            $table->string('sub_module');
            $table->string('key');

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('translate_namespaces');
	}

}
