<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
 
class CreateNotificationsTable extends Migration {
 
    public function up() {

        Schema::create('notifications', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
                         
            $table->string('type', 128)->nullable();
            $table->string('subject', 128)->nullable();
            $table->text('body')->nullable();
 
            $table->integer('object_id')->unsigned();
            $table->string('object_type', 128);
 
            $table->integer('sender_id')->nullable()->unsigned();
            $table->foreign('sender_id')->references('id')->on('users');

            $table->boolean('is_read')->default(false);
            $table->boolean('is_activity')->default(false);
            $table->dateTime('sent_at')->nullable();
            $table->boolean('sent_by_mail')->default(false);
            $table->boolean('is_mail_sent')->default(false);
            $table->timestamps();
        });
    }
 
    public function down() {
        Schema::drop('notifications');
    }
 
}
