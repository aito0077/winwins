<?php
use Illuminate\Database\Seeder;
use Winwins\Model\Language;
use Winwins\Model\TranslateNamespace;
use Winwins\Model\TranslateValue;

class LanguagesTableSeeder extends Seeder {

    public function run() {
        DB::table('languages')->delete();

        $language = new Language();
        $language->name = 'ES';
        $language->iso_code = 'es';
        $language->description = 'Español';
        $language->save();

        $language = new Language();
        $language->name = 'EN';
        $language->iso_code = 'en';
        $language->description = 'English';
        $language->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'home';
        $namespace->key = 'test';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 1;
        $translation->text = 'Testeamos';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 1;
        $translation->text = 'Testing';
        $translation->save();


    }

}
