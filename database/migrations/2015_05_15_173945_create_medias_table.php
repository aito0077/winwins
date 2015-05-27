<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMediasTable extends Migration {

	public function up() {
		Schema::create('medias', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->enum('type', ['VIDEO', 'IMAGE', 'DATA'])->default('IMAGE');

            $table->string('title');
            $table->mediumtext('description')->nullable();
            $table->mediumtext('path')->nullable();
            $table->string('bucket')->nullable();
            $table->mediumtext('thumb_path')->nullable();

            $table->boolean('disabled')->default(FALSE);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('medias');
	}


}

