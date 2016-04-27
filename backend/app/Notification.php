<?php namespace Winwins;

use Carbon;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model {

    protected $fillable   = ['user_id', 'type', 'subject', 'body', 'object_id', 'object_type', 'sent_at', 'is_activity'];
 
    private $relatedObject = null;

    public function getDates() {
        return ['created_at', 'updated_at', 'sent_at'];
    }
 
    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function sender() {
        return $this->belongsTo('Winwins\User', 'sender_id');
    }

    public function from($user) {
        $this->sender()->associate($user);
        return $this;
    }

    public function withSubject($subject) {
        $this->subject = $subject;
 
        return $this;
    }

    public function markAsActivity() {
        $this->is_activity = true;
 
        return $this;
    }
 
    public function withBody($body) {
        $this->body = $body;
 
        return $this;
    }
 
    public function withType($type) {
        $this->type = $type;
 
        return $this;
    }
 
    public function regarding($object) {
        if(is_object($object)) {
            $this->object_id   = $object->id;
            $this->object_type = get_class($object);
        }
 
        return $this;
    }
 
    public function deliver() {
        $this->sent_at = new Carbon;
        $this->save();
 
        return $this;
    }

    public function scopeUnread($query) {
        return $query->where('is_read', '=', 0);
    }

    public function hasValidObject() {

        try {

            $object = call_user_func_array($this->object_type . '::findOrFail', [$this->object_id]);

        } catch(\Exception $e) {
            return false;
        }
     
        $this->relatedObject = $object;
     
        return true;
    }
 
    public function getObject() {
        if(!$this->relatedObject) {
            $hasObject = $this->hasValidObject();
     
            if(!$hasObject) {
                throw new \Exception(sprintf("No valid object (%s with ID %s) associated with this notification.", $this->object_type, $this->object_id));
            }
        }
     
        return $this->relatedObject;
    }

}
