<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class GroupsWinwin extends Model {

    public function group() {
        return $this->hasOne('Winwins\Model\Group');
    }

    public function winwin() {
        return $this->hasOne('Winwins\Model\Winwin');
    }


}
