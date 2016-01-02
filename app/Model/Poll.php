<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model {

    protected $dates = ['closing_date'];

    public function answers() {
        return $this->hasMany('Winwins\Model\PollAnswer');
    }

}
