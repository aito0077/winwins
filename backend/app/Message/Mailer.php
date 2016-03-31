<?php namespace Winwins\Message;

use Winwins\Message\Message;
use Winwins\Message\Transport;
use Config;
use Log;

class Mailer {
    private $transport;
 
    public function __construct(Transport $transport) {
        Log:: info('A');
        $this->transport = $transport;
        Log:: info('B');
        
    }
 
    public function send(Message $message) {
        return $this->transport->send($message);
    }
}
