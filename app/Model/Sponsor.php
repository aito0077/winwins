<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model {

    public function winwins() {
        return $this->belongsToMany('Winwins\Model\Winwin', 'sponsors_winwins');
    }

    public function groups() {
        return $this->belongsToMany('Winwins\Model\Group', 'sponsors_groups');
    }

    public function users() {
        return $this->belongsToMany('Winwins\User', 'sponsors_users');
    }
}
