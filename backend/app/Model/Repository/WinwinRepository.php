<?php namespace Winwins\Model\Repository;

use Log;
use Illuminate\Support\Collection;
use Winwins\Model\Winwin;
use Elasticsearch\Client;

use Illuminate\Database\Eloquent\Model;

class WinwinRepository {

    private $elasticsearch;

    const INDEX = 'winwins';
    const INDEX_TYPE = 'winwins';

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
            $winwin = new Winwin();
            $winwin->newInstance($r['_source'], true);
            $winwin->setRawAttributes($r['_source'], true);
            $winwin->score = $r['_score'];
            return $winwin;
        }, $result));
    }

    public function summary() {
        $items = $this->elasticsearch->search([
            'index' => self::INDEX,
            'type' => self::INDEX_TYPE,
            'body' => [
                'aggregations' => [
                    'scope' => [
                        'terms' => [
                            'field' => 'scope'
                        ]
                    ],
                    'users_amount' => [
                        'range' => [
                            'field' => 'users_amount',
                            'ranges' => [
                                [ 'to' => 50 ],
                                [ 'from' => 50, 'to' => 100 ],
                                [ 'from' => 100 , 'to' => 500 ],
                                [ 'from' => 500 ]
                            ]
                        ]
                    ],
                    'closing_date' => [
                        'date_range' => [
                            'field' => 'closing_date',
                            'format' => 'dd-MM-yyyy',
                            'ranges' => [
                                [ 'to' => 'now+7d/d' ], 
                                [ 'from' => 'now+7d/d' ] 
                            ]
                        ]
                    ]

                ]
            ]
        ]);

        return $items;
    }



}
