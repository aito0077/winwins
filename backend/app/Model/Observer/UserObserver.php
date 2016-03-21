<?php namespace Winwins\Model\Observer;

use Winwins\User;
use Elasticsearch\Client;

class UserObserver {

    private $elasticsearch;

    public function __construct(Client $elasticsearch) {
        $this->elasticsearch = $elasticsearch;
    }

    public function created(User $user) {
        $this->elasticsearch->index([
            'index' => 'winwins',
            'type' => 'users',
            'id' => $user->id,
            'body' => $user->toArray()
        ]);
    }

    public function updated(User $user) {
        $this->elasticsearch->index([
            'index' => 'winwins',
            'type' => 'users',
            'id' => $user->id,
            'body' => $user->toArray()
        ]);
    }

    public function deleted(User $user) {
        $this->elasticsearch->delete([
            'index' => 'winwins',
            'type' => 'users',
            'id' => $user->id
        ]);
    }
}

