<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Group extends Model {

    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function users() {
        return $this->belongsToMany('Winwins\User', 'groups_users');
    }

    public function winwins() {
        return $this->belongsToMany('Winwins\Model\Winwin', 'groups_winwins');
    }

}
