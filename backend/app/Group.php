<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class Group extends Model {

    protected $fillable = ['user_id', 'name', 'description', 'photo', 'private', 'control_ww', 'confirm_ww', 'canceled', 'created_at'];

    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function users() {
        return $this->belongsToMany('Winwins\User', 'groups_users');
    }

    public function winwins() {
        return $this->belongsToMany('Winwins\Winwin', 'groups_winwins');
    }

    public function sponsors() {
        return $this->belongsToMany('Winwins\Sponsor', 'sponsors_groups');
    }
}
