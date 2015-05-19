<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWinwinsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('winwins', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamps();

            $table->string('title');
            $table->string('whathappen', 500);
            $table->string('description', 1000);
            $table->string('whatwedo', 500);


CREATE TABLE `winwin` (
  `id_winwin` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_territorialscale` int(11) NOT NULL,
  `id_country` int(11) DEFAULT NULL,
  `id_province` int(11) DEFAULT NULL,
  `city` tinytext COLLATE utf8_spanish_ci,
      `title` tinytext COLLATE utf8_spanish_ci NOT NULL,
      `whathappen` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
      `descripcion` varchar(1000) COLLATE utf8_spanish_ci NOT NULL,
      `whatwedo` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `closedate` date DEFAULT NULL,
  `amountusers` int(10) NOT NULL,
  `image` tinytext COLLATE utf8_spanish_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `canceled` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Indica si se cancelo el WinWins',
  `province` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `emailed` tinyint(4) DEFAULT '0',
  `selected` tinyint(1) DEFAULT '0',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_winwin`),
  KEY `id_users_fk` (`id_user`),
  KEY `id_territorialscale_fk` (`id_territorialscale`)
)
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('winwins');
	}

}
