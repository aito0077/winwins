<?php
use Illuminate\Database\Seeder;
use Winwins\Model\Language;

class LanguagesTableSeeder extends Seeder {

    public function run() {
        DB::table('languages')->delete();

        $language = new Language();
        $language->name = 'ES';
        $language->description = 'Español';
        $language->save();

        $language = new Language();
        $language->name = 'EN';
        $language->description = 'English';
        $language->save();
    }

}
