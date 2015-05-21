<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupsTable extends Migration {

	public function up() {
		Schema::create('groups', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->string('name');
            $table->longText('description')->nullable();

            $table->mediumtext('photo');

            $table->boolean('private')->default(FALSE);
            $table->boolean('control_ww')->default(FALSE);
            $table->boolean('confirm_ww')->default(FALSE);
            $table->boolean('canceled')->default(FALSE);


			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('groups');
	}

}
