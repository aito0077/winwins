# Winwins API REST

## Setup (Local)

### Clone the repository

```sh
git clone https://github.com/Cambalab/winwins.git
```

Installing *php-mcrypt* because [Error mcrypt problem](https://laracasts.com/discuss/channels/general-discussion/laravel5-new-install-mcrypt-rijndael-128-notice) after vagrant provision. Add to your */home/youruser/.homestead/after.sh*:

```sh
sudo apt-get -y update
sudo apt-get -y install php5-mcrypt
sudo php5enmod mcrypt
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

### Initial configuration of prerequisites

You need to have a access to an sql database.

Create backend/.env and add the following:

    DB_DATABASE=the_database_name
    DB_USERNAME=the_username
    DB_PASSWORD=the_password

If you need to use an external instance of Elastic Search also add

    ES_HOST=http://the_elasticsearch_host:port


### Getting Dependencies

Please download [get composer here](http://getcomposer.org/download/)

```sh
cd backend

composer install

php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
php artisan jwt:generate
```

### Database

First time do this to initialize the database:

```sh
php artisan migrate
php artisan db:seed
```

### Run a developent server

```sh
php artisan serve
```


### Client App

```sh
npm install
bower install
grunt serve
```

## More info about our components

See below

- [Jwt-auth](https://github.com/tymondesigns/jwt-auth)
- [Laravel-cors](https://github.com/barryvdh/laravel-cors)

