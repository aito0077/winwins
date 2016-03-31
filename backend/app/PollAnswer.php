<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class PollAnswer extends Model {

    protected $fillable = [ 'poll_id', 'content'];
    protected  $table = 'poll_answers';

    public function votes() {
        return $this->hasMany('Winwins\PollVote', 'answer_id');
    }

}
