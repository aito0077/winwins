<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class SponsorsGroup extends Model {

    public function sponsor() {
        return $this->hasOne('Winwins\Model\Sponsor');
    }

    public function group() {
        return $this->hasOne('Winwins\Model\Group');
    }


}
