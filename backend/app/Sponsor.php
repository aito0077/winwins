<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model {

    public static $SponsorStatus = [ 'ACTIVE', 'PENDING', 'CANCELLED' ];

    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function winwins() {
        return $this->belongsToMany('Winwins\Winwin', 'sponsors_winwins')->withPivot('sponsor_message', 'sponsor_text', 'ww_message', 'ww_accept', 'sponsor_accept');
    }

    public function groups() {
        return $this->belongsToMany('Winwins\Group', 'sponsors_groups');
    }

    public function users() {
        return $this->belongsToMany('Winwins\User', 'sponsors_users');
    }
}
