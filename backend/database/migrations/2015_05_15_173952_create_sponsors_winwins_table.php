<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSponsorsWinwinsTable extends Migration {

	public function up() {
		Schema::create('sponsors_winwins', function(Blueprint $table) {
            $table->integer('sponsor_id')->unsigned();
            $table->foreign('sponsor_id')->references('id')->on('sponsors');
            $table->integer('winwin_id')->unsigned();
            $table->foreign('winwin_id')->references('id')->on('winwins');
            $table->primary(['sponsor_id', 'winwin_id']);  

            $table->longText('ww_message')->nullable();
            $table->longText('sponsor_message')->nullable();

            $table->longText('sponsor_text')->nullable();

            $table->boolean('ww_accept')->default(FALSE);
            $table->boolean('sponsor_accept')->default(FALSE);
            $table->integer('order')->unsigned();

			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('sponsors_winwins');
	}


}


