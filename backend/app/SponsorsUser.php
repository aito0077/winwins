<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class SponsorsUser extends Model {

    public function user() {
        return $this->hasOne('Winwins\User');
    }

    public function sponsor() {
        return $this->hasOne('Winwins\Sponsor');
    }

}
