<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class WinwinsUser extends Model {
    protected $fillable = [ 'user_id', 'winwin_id'];

    public function user() {
        return $this->hasOne('Winwins\User');
    }

    public function winwin() {
        return $this->hasOne('Winwins\Winwin');
    }

}
