<?php namespace Winwins\Message;

use Carbon;

class Message {

    private $template;
    private $content;
    private $to = [];
    private $subject;
 
    private $sent = false;
 
    public function __construct($template, array $content) {
        $this->template = $template;
        $this->content  = $content;
    }
 
    public function to($name, $email) {
        $this->to[] = array_merge(compact('name', 'email'), ['type' => 'to']);
    }
 
    public function subject($subject) {
        $this->subject = $subject;
    }
 
    public function sent() {
        $this->sent = true;
    }
 
    public function isSent() {
        return $this->sent;
    }
 
    public function toArray() {
        return [
            'template' => $this->template,
            'subject'  => $this->subject,
            'to'       => $this->to,
            'content'  => $this->content
        ];
    }
 
    public function __get($key) {
        if (property_exists($this, $key)) {
            return $this->$key;
        }
    }
}
