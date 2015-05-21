<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupsUsersTable extends Migration {

	public function up() {
		Schema::create('groups_users', function(Blueprint $table) {
            $table->integer('group_id')->unsigned();
            $table->foreign('group_id')->references('id')->on('groups');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->primary(['group_id', 'user_id']);  

            $table->boolean('moderator')->default(FALSE);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('groups_users');
	}


}




