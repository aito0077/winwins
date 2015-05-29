<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Winwin extends Model {

    protected $fillable = [ 'closing_date', 'description', 'title', 'users_amount', 'what_we_do'];
    protected $visible = [ 'id', 'user_id', 'user', 'users', 'title', 'what_happen', 'description', 'what_we_do', 'users_amount', 'closing_date', 'scope', 'region', 'country', 'state', 'city', 'image', 'published', 'already_joined'];

    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function users() {
        return $this->belongsToMany('Winwins\User', 'winwins_users');
    }

    public function groups() {
        return $this->belongsToMany('Winwins\Model\Group', 'groups_winwins');
    }

    public function sponsors() {
        return $this->belongsToMany('Winwins\Model\Sponsor', 'sponsors_winwins');
    }
}
