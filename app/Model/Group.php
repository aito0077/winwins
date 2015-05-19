<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Group extends Model {

	protected $table = 'group';
	protected $primaryKey = 'id_group';

	protected $fillable = ['name', 'description', 'type', 'winwincontrol'];

	protected $guarded = [ 'created', 'canceled'];


/*
  'id_group', 'id_user'
  `photo` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
*/


}
