<?php namespace Winwins\Providers;

use Config;
use Winwins\Model\Observer\ESWinwinObserver;
use Winwins\Model\Observer\ESUserObserver;
use Winwins\Model\Observer\UserObserver;
use Winwins\Model\Observer\ESGroupObserver;
use Winwins\User;
use Winwins\Winwin;
use Winwins\UserDetail;
use Winwins\Group;

use Elasticsearch\Client;
use Illuminate\Support\ServiceProvider;

class ObserversServiceProvider extends ServiceProvider {
    public function boot() {
        Winwin::observe($this->app->make(ESWinwinObserver::class));
        UserDetail::observe($this->app->make(ESUserObserver::class));
        User::observe($this->app->make(UserObserver::class));
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
        $this->app->bindShared(UserObserver::class, function() use ($params){
            return new UserObserver(new Client($params));
        });

    }
}
