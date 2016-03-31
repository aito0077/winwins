<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class InterestsInterested extends Model {
    
    protected $table = 'interests_interested';

    protected $fillable = [ 'interest_id', 'interested_id', 'type'];

    public function interest() {
        return $this->hasOne('Winwins\Interest');
    }


}
