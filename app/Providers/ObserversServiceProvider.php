<?php namespace Winwins\Providers;

use Config;
use Winwins\Model\Observer\ESWinwinObserver;
use Winwins\Model\Observer\ESUserObserver;
use Winwins\Model\Observer\ESGroupObserver;
use Winwins\Model\Winwin;
use Winwins\Model\UserDetail;
use Winwins\Model\Group;

use Elasticsearch\Client;
use Illuminate\Support\ServiceProvider;

class ObserversServiceProvider extends ServiceProvider {
    public function boot() {
        Winwin::observe($this->app->make(ESWinwinObserver::class));
        UserDetail::observe($this->app->make(ESUserObserver::class));
        Group::observe($this->app->make(ESGroupObserver::class));
    }

    public function register() {
        $params = array();
        $params['hosts'] = array(Config::get('app.es_hosts'));

        $this->app->bindShared(ESWinwinObserver::class, function() use ($params) {
            return new ESWinwinObserver(new Client($params));
        });
        $this->app->bindShared(ESGroupObserver::class, function() use ($params) {
            return new ESGroupObserver(new Client($params));
        });
        $this->app->bindShared(ESUserObserver::class, function() use ($params){
            return new ESUserObserver(new Client($params));
        });

    }
}
