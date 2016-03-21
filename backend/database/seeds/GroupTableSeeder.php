<?php
use Illuminate\Database\Seeder;
use Winwins\Model\Winwin;
use Winwins\Model\Post;
use Winwins\Model\Media;
use Winwins\Model\Group;

class GroupTableSeeder extends Seeder {

    public function run() {
        DB::table('groups')->delete();

        $group = new Group();
        $group->user_id = "79";
        $group->name = "Que viven en Estancias";
        $group->description= "Quiero probar winwins y ver si se suman al grupo 10 personas que vivan en Estancias del Pilar, so,o para probar como funciona y cuanto tarda.";
        $group->control_ww = 1;
        $group->confirm_ww = 1;
        $group->photo = "ww-default.jpg";
        $group->save();

        $group = new Group();
        $group->user_id = "42";
        $group->name = "Exploradores del Yo";
        $group->description = "Grupo de personas interesadas en juegos, test y ejercicios para conocernos mejor.";
        $group->control_ww = 1;
        $group->confirm_ww = 1;
        $group->photo = "ww-default-4.jpg";
        $group->save();

        $group = new Group();
        $group->user_id = "102";
        $group->name = "English Speakers";
        $group->description = "To train the language and arrage chating meetings";
        $group->control_ww = 1;
        $group->confirm_ww = 1;
        $group->photo = "ww-default-6.jpg";
        $group->save();


    }

}

