<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class Media extends Model {

    protected $fillable = [ 'name', 'ext', 'type', 'user_id'];

    protected $table = 'medias';


}
