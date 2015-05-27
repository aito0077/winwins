<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class WinwinsUser extends Model {

    public function user() {
        return $this->hasOne('Winwins\User');
    }

    public function winwin() {
        return $this->hasOne('Winwins\Model\Winwin');
    }

}
