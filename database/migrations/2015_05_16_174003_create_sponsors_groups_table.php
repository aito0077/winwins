<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSponsorsGroupsTable extends Migration {

	public function up() {
		Schema::create('sponsors_groups', function(Blueprint $table) {
            $table->integer('group_id')->unsigned();
            $table->foreign('group_id')->references('id')->on('groups');

            $table->integer('sponsor_id')->unsigned();
            $table->foreign('sponsor_id')->references('id')->on('sponsors');

            $table->primary(['group_id', 'sponsor_id']);  

            $table->boolean('moderator')->default(FALSE);

            $table->longText('group_message')->nullable();
            $table->longText('sponsor_message')->nullable();
            $table->longText('sponsor_text')->nullable();

            $table->boolean('group_accept')->default(FALSE);
            $table->boolean('sponsor_accept')->default(FALSE);
            $table->integer('order')->unsigned();

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('sponsors_groups');
	}

}

