<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWinwinsTable extends Migration {

	public function up() {

		Schema::create('winwins', function(Blueprint $table) {
			$table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

			$table->timestamps();

            $table->string('title');
            $table->string('what_happen', 500)->nullable();
            $table->string('description', 1000)->nullable();
            $table->string('what_we_do', 500);

            $table->integer('users_amount')->default(2);
            $table->integer('users_joined')->default(1);
            $table->date('closing_date')->nullable();

            $table->enum('scope', ['GLOBAL', 'REGION', 'COUNTRY', 'STATE', 'CITY'])->default('GLOBAL');
            $table->integer('location_id')->unsigned()->nullable();
            $table->foreign('location_id')->references('id')->on('locations');

            $table->boolean('is_video')->default(FALSE);
            $table->string('video')->nullable();
            $table->string('image')->nullable()->default('ww-main-default.jpg');

            $table->boolean('finished')->default(FALSE);
            $table->enum('status', ['PUBLISHED', 'PENDING', 'BANNED', 'CANCELED', 'FINISHED', 'SUCCESSFUL'])->default('PENDING');

            $table->boolean('canceled')->default(FALSE);
            $table->boolean('emailed')->default(FALSE);
            $table->boolean('published')->default(FALSE);
            $table->boolean('selected')->default(FALSE);

            $table->mediumText('canceled_reason')->nullable();

            $table->boolean('notification_user_post')->default(TRUE);
            $table->boolean('notification_new_participant')->default(TRUE);
            $table->boolean('notification_new_poll')->default(TRUE);
            $table->boolean('notification_announce')->default(TRUE);
            $table->boolean('notification_new_sponsor')->default(TRUE);
            $table->boolean('notification_closing_date')->default(TRUE);


		});
	}

	public function down() {
		Schema::drop('winwins');
	}

}


