<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model {

    protected $visible = [ 'id', 'user_id', 'base', 'lastname', 'name', 'birthdate', 'country', 'state', 'city', 'study', 'occupation', 'about', 'interests', 'sex', 'cover_photo', 'photo' ];

    public function base() {
        return $this->belongsTo('Winwins\User');
    }


}
