<?php namespace Winwins\Model\Observer;

use Winwins\Model\Winwin;
use Elasticsearch\Client;
use Log;

class ESWinwinObserver {

    private $elasticsearch;

    public function __construct(Client $elasticsearch) {
        $this->elasticsearch = $elasticsearch;
    }

    public function created(Winwin $winwin) {
        $this->elasticsearch->index([
            'index' => 'winwins',
            'type' => 'winwins',
            'id' => $winwin->id,
            'body' => $winwin->toArray()
        ]);
        Log::info('Indexed ww');
    }

    public function updated(Winwin $winwin) {
        $this->elasticsearch->index([
            'index' => 'winwins',
            'type' => 'winwins',
            'id' => $winwin->id,
            'body' => $winwin->toArray()
        ]);
    }

    public function deleted(Winwin $winwin) {
        $this->elasticsearch->delete([
            'index' => 'winwins',
            'type' => 'winwins',
            'id' => $winwin->id
        ]);
    }
}
