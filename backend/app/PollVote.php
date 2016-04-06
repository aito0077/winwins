<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class PollVote extends Model {

    protected $fillable = [ 'answer_id', 'user_id', 'content'];

}
