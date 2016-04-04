<?php namespace Winwins;

use Hash;
use Winwins\Notification;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	protected $table = 'users';

	protected $fillable = ['username', 'email', 'password'];

	protected $hidden = ['password', 'facebook', 'google', 'yahoo', 'twitter', 'canceled', 'suspend', 'active', 'accept_terms', 'created_at', 'updated_at', 'cancel_reason'];

    /*
	public function setPasswordAttribute($password) {
		$this->attributes['password'] = Hash::make($password);
	}
    */

    public function detail() {
        return $this->hasOne('Winwins\UserDetail');
    }

    public function winwins() {
        return $this->belongsToMany('Winwins\Winwin', 'winwins_users')->withPivot('creator', 'moderator');
    }

    public function groups() {
        return $this->belongsToMany('Winwins\Group', 'groups_users')->withPivot('moderator');
    }

    public function sponsor() {
        return $this->hasOne('Winwins\Sponsor');
    }

    public function following() {
        return $this->belongsToMany('Winwins\User', 'followers', 'follower_id', 'followed_id' );
    }

    public function followers() {
        return $this->belongsToMany('Winwins\User', 'followers', 'followed_id', 'follower_id');
    }

    public function notifications() {
        return $this->hasMany('Winwins\Notification');
    }

    public function sponsors() {
        return $this->belongsToMany('Winwins\Sponsor', 'sponsors_users');
    }
    
/*
    $user->newNotification()
    ->from($sender)
    ->withType('RecipeFavorited')
    ->withSubject('Your recipe has been favorited.')
    ->withBody('<User X> favorited your Caramel Cream Cakes recipe!')
    ->regarding($recipe)
    ->deliver();
*/

    public function newNotification() {
        $notification = new Notification;
        $notification->user()->associate($this);
 
        return $notification;
    }

    public function newActivity() {
        $notification = new Notification;
        $notification->markAsActivity();
        $notification->user()->associate($this);
 
        return $notification;
    }
}
