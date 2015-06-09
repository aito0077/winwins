<?php namespace Winwins\Model\Repository;

use Log;
use Illuminate\Support\Collection;
use Winwins\Model\UserDetail;
use Elasticsearch\Client;

use Illuminate\Database\Eloquent\Model;

class UserRepository {

    private $elasticsearch;

    const INDEX = 'winwins';
    const INDEX_TYPE = 'users';
    
    public function __construct(Client $client) {
        $this->elasticsearch = $client;
    }

    public function search($query) {
        $items = $this->elasticsearch->search([
            'index' => self::INDEX,
            'type' => self::INDEX_TYPE,
            'body' => [
                'query' => [
                    'query_string' => [
                        'query' => $query
                    ]
                ]
            ]
        ]);

        return $this->buildCollection($items);
    }

    private function buildCollection($items) {
        $result = $items['hits']['hits'];

        return Collection::make(array_map(function($r) {
            $user = new UserDetail();
            $user->newInstance($r['_source'], true);
            $user->setRawAttributes($r['_source'], true);
            return $user;
        }, $result));
    }

}
