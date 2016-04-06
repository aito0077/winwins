<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class Winwin extends Model {

    protected $fillable = [ 'closing_date', 'description', 'title', 'users_amount', 'what_we_do', 'created_date', 'scope', 'image'];
    //protected $visible = [ 'id', 'user_id', 'user', 'users', 'title', 'what_happen', 'description', 'what_we_do', 'users_amount', 'closing_date', 'scope', 'region', 'country', 'state', 'city', 'image', 'published', 'already_joined', 'score'];

    protected $dates = ['closing_date'];

    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function users() {
        return $this->belongsToMany('Winwins\User', 'winwins_users')->withPivot('creator', 'moderator', 'process_rate');
    }

    public function groups() {
        return $this->belongsToMany('Winwins\Group', 'groups_winwins');
    }

    public function sponsors() {
        return $this->belongsToMany('Winwins\Sponsor', 'sponsors_winwins')->withPivot('ww_accept', 'sponsor_accept', 'sponsor_text', 'sponsor_message', 'ww_message');
    }

    public function polls() {
        return $this->hasMany('Winwins\Poll');
    }

    public function location() {
        return $this->belongsTo('Winwins\Location');
    }


}
