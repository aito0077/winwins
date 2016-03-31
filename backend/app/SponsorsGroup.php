<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class SponsorsGroup extends Model {

    public function sponsor() {
        return $this->hasOne('Winwins\Sponsor');
    }

    public function group() {
        return $this->hasOne('Winwins\Group');
    }


}
