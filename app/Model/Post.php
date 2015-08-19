<?php namespace Winwins\Model;

use Illuminate\Database\Eloquent\Model;

class Post extends Model {

//
    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function media() {
        return $this->belongsTo('Winwins\Model\Media');
    }

    public function scopeWinwins($query) {
        return $query->where('type', 'WINWIN');
    }

    public function scopeGroups($query) {
        return $query->where('type', 'GROUP');
    }

    public function scopeDashboard($query) {
        return $query->where('type', 'DASHBOARD');
    }

    public function scopeUser($query) {
        return $query->where('type', 'USER_TESTIMONIAL');
    }

    public function scopeComments($query) {
        return $query->where('type', 'WW_COMMENT');
    }
}
