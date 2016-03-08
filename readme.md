# Winwins API REST

## Setup

### Clone the repository

```sh
git clone https://github.com/aito0077/winwins.git
```

### Install Laravel Homestead Vagrant Box

```sh
apt-get install virtualbox
apt-get install vagrant
vagrant box add laravel/homestead
```

More info [Laravel Homestead](http://laravel.com/docs/5.0/homestead)

### Config Laravel Homestaead

```sh
git clone https://github.com/laravel/homestead.git Homestead
cd Homestead
bash init.sh
```

Edit file /home/youruser/.homestead/Homestead.yaml replacing:
- Domain name
- Directories: sites and folders to your directories.

Example:
```
folders:
    - map: /home/youruser/projects/winwins
      to: /home/vagrant/Code

sites:
    - map: dev.winwins.org
      to: /home/vagrant/Code/public

```

Edit /etc/hosts, adding our new host

```
192.168.10.10  winwins.app
```

Installing *php-mcrypt* because [Error mcrypt problem](https://laracasts.com/discuss/channels/general-discussion/laravel5-new-install-mcrypt-rijndael-128-notice) after vagrant provision. Add to your */home/youruser/.homestead/after.sh*:

```sh
sudo apt-get -y update
sudo apt-get -y install php-mcrypt
```

Install *elasticsearch* to test it locally

```sh
apt-get install openjdk-7-jre-headless -y
wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb http://packages.elastic.co/elasticsearch/2.x/debian stable main" | sudo tee -a /etc/apt/sources.list.d/elasticsearch-2.x.list
sudo apt-get -y update
sudo apt-get -y install elasticsearch
sudo update-rc.d elasticsearch defaults 95 10
sudo service elasticsearch restart
```

After up your vagrant box
```sh
vagrant up
```


### Using Vagrant box


*You must be in you homestead folder*


Run box

```sh
vagrant up
```

Stop box

```sh
vagrant halt
```

Kill box

```sh
vagrant destroy --force
```

Connect via SSH

```sh
vagrant ssh
```


### Getting Dependencies (via ssh)

Please download [get composer here](http://getcomposer.org/download/)

*You must be in you /home/vagrant/Code dir*

```sh
composer install
```


### Database (via ssh)

*You must be in you /home/vagrant/Code dir*

First time do this to initialize the database:

```sh
php artisan migrate
php artisan db:seed
```

### config Local elasticsearch

Edit config/app.php and replace to localhost:9200

```
'es_hosts' => env('ES_HOST', 'http://localhost:9200')
```

### Client App

```sh
npm install
bower install
grunt serve
```

### More dependencies (via ssh)

*I dont know if We really need this*

*You must be in you /home/vagrant/Code dir*

```sh
composer require tymon/jwt-auth:0.5.*
```

Edit config/app.php

- In providers:
'Tymon\JWTAuth\Providers\JWTAuthServiceProvider'

- In Aliases:
'JWTAuth' => 'Tymon\JWTAuth\Facades\JWTAuth'
'JWTFactory' => 'Tymon\JWTAuth\Facades\JWTFactory'


```sh
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
php artisan jwt:generate
```

More info:
- [Jwt-auth](https://github.com/tymondesigns/jwt-auth)
- [Laravel-cors](https://github.com/barryvdh/laravel-cors)


