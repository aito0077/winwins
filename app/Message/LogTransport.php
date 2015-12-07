<?php namespace Winwins\Message;

use Winwins\Message\Message;
use Winwins\Message\Transport;
use Psr\Log\LoggerInterface;
 
class LogTransport implements Transport {

    private $logger;
 
    public function __construct(LoggerInterface $logger) {
        $this->logger = $logger;
    }
 
    public function send(Message $message) {
        $this->logger->debug('Mailer:', $message->toArray());
        $message->sent();
        return $message;
    }
}
