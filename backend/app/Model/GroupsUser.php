<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class GroupsUser extends Model {

    public function user() {
        return $this->hasOne('Winwins\User');
    }

    public function sponsor() {
        return $this->hasOne('Winwins\Model\Group');
    }

}
