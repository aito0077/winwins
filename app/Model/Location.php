<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;
 
class Location extends Model {

    protected $fillable = ['google_id', 'place_id', 'name', 'sublocality', 'locality', 'administrative_area_level_2', 'administrative_area_level_1', 'country', 'formatted_address', 'longitude', 'latitude'];


}
