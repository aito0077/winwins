<?php namespace Winwins\Providers;

use Config;
use Winwins\Model\Repository\WinwinRepository;
use Winwins\Model\Repository\UserRepository;
use Winwins\Model\Repository\GroupRepository;
use Elasticsearch\Client;
use Illuminate\Support\ServiceProvider;

class RepositoriesServiceProvider extends ServiceProvider {
    public function register() {
        $params = array();
        $params['hosts'] = array(Config::get('app.es_hosts'));
        $this->app->bindShared(WinwinRepository::class, function($app) use ($params) {
            return new WinwinRepository(new Client($params));
        });
        $this->app->bindShared(UserRepository::class, function($app) use ($params) {
            return new UserRepository(new Client($params));
        });
        $this->app->bindShared(GroupRepository::class, function($app) use ($params) {
            return new GroupRepository(new Client($params));
        });

    }
}
