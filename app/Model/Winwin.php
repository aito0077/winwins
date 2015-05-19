<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Winwin extends Model {

	protected $table = 'winwin';
	protected $primaryKey = 'id_winwin';

	protected $fillable = [ 'title', 'whathappen', 'descripcion', 'whatwedo', 'closedate', 'amountusers'];

	protected $guarded = [ 'created', 'canceled', 'emailed', 'selected', 'published'];


/*
  `id_winwin` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,

  `id_territorialscale` int(11) NOT NULL,
  `id_country` int(11) DEFAULT NULL,
  `id_province` int(11) DEFAULT NULL,
  `province` varchar(128) COLLATE utf8_spanish_ci DEFAULT NULL,
  `city` tinytext COLLATE utf8_spanish_ci,

  `image` tinytext COLLATE utf8_spanish_ci,
*/
}
