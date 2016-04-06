<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model {

    protected $dates = ['closing_date'];

    public function answers() {
        return $this->hasMany('Winwins\PollAnswer');
    }

}
