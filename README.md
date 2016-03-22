# Clone repo

```sh
git clone https://github.com/Cambalab/winwins.git
```

---

# Winwins API REST

## Setup (Local)

Installing *php-mcrypt* because [Error mcrypt problem](https://laracasts.com/discuss/channels/general-discussion/laravel5-new-install-mcrypt-rijndael-128-notice):

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

## Initial configuration of prerequisites

You need to have a access to an sql database.

Create backend/.env and add the following:

    DB_DATABASE=the_database_name
    DB_USERNAME=the_username
    DB_PASSWORD=the_password

If you need to use an external instance of Elastic Search also add

    ES_HOST=http://the_elasticsearch_host:port


## Getting Dependencies

Please download [get composer here](http://getcomposer.org/download/)

```sh
cd backend

composer install

php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
php artisan jwt:generate
```

## Database

First time do this to initialize the database:

```sh
php artisan migrate
php artisan db:seed
```

## Run backend server

```sh
php artisan serve
```

Will start Laravel development server [http://localhost:8000/](http://localhost:8000/)

## More info about our components

See below

- [Jwt-auth](https://github.com/tymondesigns/jwt-auth)
- [Laravel-cors](https://github.com/barryvdh/laravel-cors)

---

# Frontend

Using as base generator [Generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)

## Requirements

```sh
apt-get install node npm ruby ruby-dev ruby-sass ruby-compass

npm install -g gulp bower
```

## Installation
```sh
cd frontend

npm install

```

## Run dev backend server
```sh
npm start
```

Start Browser tab with [http://localhost:3000/index.html](http://localhost:3000/index.html)
