<?php namespace Winwins\Providers;

use Config;
use Log;
use Illuminate\Support\ServiceProvider;
use Winwins\Message\TransportManager;
use Winwins\Message\Mailer;

class MailServiceProvider extends ServiceProvider {
    public function boot() {
    }

    public function register() {
        $this->app->singleton('Winwins\Message\Mailer', function ($app) {
            $manager = new TransportManager($app);
            return new Mailer($manager->driver());
        });
    }
}
