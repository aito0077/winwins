<?php namespace Winwins\Model\Observer;

use Winwins\Model\UserDetail;
use Elasticsearch\Client;

class ESUserObserver {

    private $elasticsearch;

    public function __construct(Client $elasticsearch) {
        $this->elasticsearch = $elasticsearch;
    }

    public function created(UserDetail $userDetail) {
        $this->elasticsearch->index([
            'index' => 'winwins',
            'type' => 'users',
            'id' => $userDetail->user_id,
            'body' => $userDetail->toArray()
        ]);
    }

    public function updated(UserDetail $userDetail) {
        $this->elasticsearch->index([
            'index' => 'winwins',
            'type' => 'users',
            'id' => $userDetail->user_id,
            'body' => $userDetail->toArray()
        ]);
    }

    public function deleted(UserDetail $userDetail) {
        $this->elasticsearch->delete([
            'index' => 'winwins',
            'type' => 'users',
            'id' => $userDetail->id
        ]);
    }
}
