<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class PollAnswer extends Model {

    protected $fillable = [ 'poll_id', 'content'];
    protected  $table = 'poll_answers';

    public function votes() {
        return $this->hasMany('Winwins\Model\PollVote', 'answer_id');
    }

}
