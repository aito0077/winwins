<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupsWinwinsTable extends Migration {

	public function up() {
		Schema::create('groups_winwins', function(Blueprint $table) {
            $table->integer('group_id')->unsigned();
            $table->foreign('group_id')->references('id')->on('groups');

            $table->integer('winwin_id')->unsigned();
            $table->foreign('winwin_id')->references('id')->on('winwins');

            $table->primary(['group_id', 'winwin_id']);  

            $table->boolean('pending')->default(TRUE);

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('groups_winwins');
	}


}
