<?php namespace Winwins\Message;

use Config;
use Winwins\Message\MandrillTransport;
use Winwins\Message\LogTransport;
use GuzzleHttp\Client;
use Log;
use Illuminate\Support\Manager;


class TransportManager extends Manager {

    public function getDefaultDriver() {
        Log::info($this->app['config']['mail.driver']);
        return $this->app['config']['mail.driver'];
    }

    protected function createLogDriver() {
        Log::info('A');
        return new LogTransport($this->app->make('Psr\Log\LoggerInterface'));
    }

    public function createMandrillDriver() {
        Log::info('B');
        $client = new Client;
     
        $config = $this->app['config']->get('services.mandrill', []);
     
        return new MandrillTransport($config['secret'], $client, [
            'track_opens'    => true,
            'track_clicks'   => true,
            'async'          => false,
            'merge_language' => 'handlebars'
        ]);
    }
}
