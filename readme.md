Winwins API REST
============================

## Note


## Installation
- Clone the repository 
- Use [Laravel Homestead](http://laravel.com/docs/5.0/homestead)
- SSH in to your Homestead Vagrant box
- Run `php composer install` to install the dependencies ([get composer here](http://getcomposer.org/download/))
- Run `php artisan migrate` to setup the database
- Follow [Jwt-auth](https://github.com/tymondesigns/jwt-auth) and [Laravel-cors](https://github.com/barryvdh/laravel-cors) in order to config your dependencies
- Run `php artisan config:publish` to publish JWT and CORS packages config files
