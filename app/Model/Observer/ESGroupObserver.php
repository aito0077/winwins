<?php namespace Winwins\Model\Observer;

use Winwins\Model\Group;
use Elasticsearch\Client;

class ESGroupObserver {

    private $elasticsearch;

    public function __construct(Client $elasticsearch) {
        $this->elasticsearch = $elasticsearch;
    }

    public function created(Group $group) {
        $this->elasticsearch->index([
            'index' => 'winwins',
            'type' => 'groups',
            'id' => $group->id,
            'body' => $group->toArray()
        ]);
    }

    public function updated(Group $group) {
        $this->elasticsearch->index([
            'index' => 'winwins',
            'type' => 'groups',
            'id' => $group->id,
            'body' => $group->toArray()
        ]);
    }

    public function deleted(Group $group) {
        $this->elasticsearch->delete([
            'index' => 'winwins',
            'type' => 'groups',
            'id' => $group->id
        ]);
    }
}
