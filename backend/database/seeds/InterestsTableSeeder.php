<?php
use Illuminate\Database\Seeder;
use Winwins\Model\Interest;

class InterestsTableSeeder extends Seeder {

    public function run() {
        DB::table('interests')->delete();

        $interest = new Interest();
        $interest->name = 'IT';
        $interest->description = 'Internet / Tecnología';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'CONSUME';
        $interest->description = 'Consumo Responsable / Comercio Justo';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'HEALTH';
        $interest->description = 'Salud / Terapias';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'CIVIL';
        $interest->description = 'Participación cívica / Asuntos Públicos';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'ECO';
        $interest->description = 'Naturaleza / Medio Ambiente';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'ART';
        $interest->description = 'Cultura / Artes / Espectáculos';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'EDUCATION';
        $interest->description = 'Educación / Formación';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'SPORT';
        $interest->description = 'Deportes / Actividad física';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'JOB';
        $interest->description = 'Empleo / Acuerdos Laborales';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'ENTRETAINMENT';
        $interest->description = 'Entretenimiento / Festejos / Juegos';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'SOCIAL';
        $interest->description = 'Solidaridad / Cooperación';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'GENRE';
        $interest->description = 'Diversidad / Convivencia';
        $interest->save();

        $interest = new Interest();
        $interest->name = 'FAMILY';
        $interest->description = 'Pareja / Familia / Amigos';
        $interest->save();
    }

}
