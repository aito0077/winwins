<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model {

    protected $fillable = [ 'user_id', 'base', 'lastname', 'name', 'country', 'state', 'city', 'study', 'occupation', 'about', 'interests', 'sex', 'cover_photo', 'photo'];
    //protected $visible = [ 'id', 'user_id', 'base', 'lastname', 'name', 'birthdate', 'country', 'state', 'city', 'study', 'occupation', 'about', 'interests', 'sex', 'cover_photo', 'photo' ];

    public function base() {
        return $this->belongsTo('Winwins\User');
    }


}
