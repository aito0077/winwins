<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersDetailTable extends Migration {

	public function up() {
		Schema::create('user_details', function(Blueprint $table) {
			$table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->boolean('private')->default(FALSE);

			$table->string('language_code')->default('ES');
            $table->boolean('email_notification')->default(TRUE);
            $table->boolean('invite_ww')->default(TRUE);
            $table->boolean('ww_to_finish')->default(TRUE);
            $table->boolean('invite_group')->default(TRUE);
            $table->boolean('not_message')->default(FALSE);

            $table->string('lastname')->nullable();
            $table->string('name')->nullable();
			$table->dateTime('birthdate')->nullable();

            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();

            $table->string('study')->nullable();
            $table->string('occupation')->nullable();
            $table->longText('about')->nullable();
            $table->longText('interests')->nullable();

            $table->enum('sex', ['M', 'F'])->nullable();

            $table->string('cover_photo')->default('default-no-image.jpg');

            $table->string('photo')->default('placeholder-square.jpg');

            $table->integer('followers_amount')->unsigned();
            $table->integer('winwins_amount')->unsigned();


            //`id_maritalstatus` int(11) DEFAULT NULL,


			$table->timestamps();
		});
	}

	public function down() {
		Schema::drop('user_details');
	}

}
