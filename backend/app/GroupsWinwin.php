<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class GroupsWinwin extends Model {

    public function group() {
        return $this->hasOne('Winwins\Group');
    }

    public function winwin() {
        return $this->hasOne('Winwins\Winwin');
    }


}
