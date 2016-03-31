<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class SponsorsWinwin extends Model {
    protected $fillable = [ 'sponsor_id', 'winwin_id'];

    public function sponsor() {
        return $this->hasOne('Winwins\Sponsor');
    }

    public function winwin() {
        return $this->hasOne('Winwins\Winwin');
    }

}
