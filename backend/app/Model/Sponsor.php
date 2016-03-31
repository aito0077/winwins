<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model {

    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function winwins() {
        return $this->belongsToMany('Winwins\Model\Winwin', 'sponsors_winwins')->withPivot('sponsor_message', 'sponsor_text', 'ww_message', 'ww_accept', 'sponsor_accept');
    }

    public function groups() {
        return $this->belongsToMany('Winwins\Model\Group', 'sponsors_groups');
    }

    public function users() {
        return $this->belongsToMany('Winwins\User', 'sponsors_users');
    }
}
