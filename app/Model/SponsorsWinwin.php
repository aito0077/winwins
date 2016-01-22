<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class SponsorsWinwin extends Model {
    protected $fillable = [ 'sponsor_id', 'winwin_id'];

    public function sponsor() {
        return $this->hasOne('Winwins\Model\Sponsor');
    }

    public function winwin() {
        return $this->hasOne('Winwins\Model\Winwin');
    }

}
