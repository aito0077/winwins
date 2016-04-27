<?php
use Illuminate\Database\Seeder;
use Winwins\Model\MaritalStatus;

class MaritalStatusTableSeeder extends Seeder {

    public function run() {
        DB::table('marital_status')->delete();

        $mstatus = new MaritalStatus();
        $mstatus->name = 'MARRIAGE';
        $mstatus->description = 'Casado';
        $mstatus->save();

        $mstatus = new MaritalStatus();
        $mstatus->name = 'SINGLE';
        $mstatus->description = 'Soltero';
        $mstatus->save();
    }

}
