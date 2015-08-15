<?php
use Illuminate\Database\Seeder;
use Winwins\Model\Sponsor;
use Winwins\Model\SponsorsUser;

class SponsorsTableSeeder extends Seeder {

    public function run() {
        DB::table('sponsors')->delete();

        $sponsor = new Sponsor();
        $sponsor->name = 'Coca Cola'; 
        $sponsor->user_id = 2; 
        $sponsor->about = 'The Coca Cola Company'; 
        $sponsor->contact_name = 'Mr. Coca'; 
        $sponsor->contact_phone = '111111111111'; 
        $sponsor->contact_email = 'info@cocacola.com'; 
        $sponsor->type = 'Industria - Comercial'; 
        $sponsor->cover_photo = 'cocacola.png'; 
        $sponsor->photo = 'cocacola.png'; 

        $sponsor->save();

        $sponsors_user = new SponsorsUser();
        $sponsors_user->user_id = 2;
        $sponsors_user->sponsor_id = 1;
        $sponsors_user->save();


    }

}

