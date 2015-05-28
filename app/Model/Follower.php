<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model {

    public function followed() {
        return $this->hasOne('Winwins\User', 'followed_id');
    }

    public function follower() {
        return $this->hasOne('Winwins\User', 'follower_id');
    }

}
