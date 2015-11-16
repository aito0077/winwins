<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class PostVote extends Model {

    protected $table = 'post_votes';
    protected $fillable = ['user_id', 'post_id', 'positive'];

    public function user() {
        return $this->hasOne('Winwins\User');
    }

    public function post() {
        return $this->hasOne('Winwins\Model\Post');
    }

}

