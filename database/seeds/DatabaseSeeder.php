<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->call('ActivityTypesTableSeeder');
        $this->command->info('Activity Types seeded!');

		$this->call('InterestsTableSeeder');
        $this->command->info('Interests seeded!');

		$this->call('LanguagesTableSeeder');
        $this->command->info('Languages seeded!');

		$this->call('MaritalStatusTableSeeder');
        $this->command->info('Maital seeded!');

		$this->call('UsersTableSeeder');
        $this->command->info('Users seeded!');

		$this->call('WinwinsTableSeeder');
        $this->command->info('Winwins seeded!');
	}

}
