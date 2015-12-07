<?php namespace Winwins\Message;

use Config;

interface Transport {
    public function send(Message $message);
}
