<?php
use Illuminate\Database\Seeder;
use Winwins\Model\Sponsor;
use Winwins\Model\SponsorsUser;
use Winwins\Model\SponsorsWinwin;

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
        $sponsor->cover_photo = 'cocacola2.png'; 
        $sponsor->is_active = 1; 
        $sponsor->is_main = 1; 
        $sponsor->status = 'ACTIVE'; 
        $sponsor->photo = 'cocacola2.png'; 

        $sponsor->save();

        $sponsors_user = new SponsorsUser();
        $sponsors_user->user_id = 3;
        $sponsors_user->sponsor_id = 1;
        $sponsors_user->save();

        $sponsors_winwins = new SponsorsWinwin();
        $sponsors_winwins->winwin_id = 1;
        $sponsors_winwins->sponsor_id = 1;
        $sponsors_winwins->ww_message = 'Me aceptas?';
        $sponsors_winwins->ww_accept = 1;
        $sponsors_winwins->sponsor_accept = 1;
        $sponsors_winwins->order = 1;
        $sponsors_winwins->save();

        $sponsors_winwins = new SponsorsWinwin();
        $sponsors_winwins->winwin_id = 2;
        $sponsors_winwins->sponsor_id = 1;
        $sponsors_winwins->sponsor_message = 'Me aceptas?';
        $sponsors_winwins->ww_accept = 1;
        $sponsors_winwins->sponsor_accept = 1;
        $sponsors_winwins->order = 2;
        $sponsors_winwins->save();

        $sponsors_winwins = new SponsorsWinwin();
        $sponsors_winwins->winwin_id = 3;
        $sponsors_winwins->sponsor_id = 1;
        $sponsors_winwins->sponsor_message = 'Me aceptas?';
        $sponsors_winwins->ww_accept = 1;
        $sponsors_winwins->sponsor_accept = 1;
        $sponsors_winwins->order = 4;
        $sponsors_winwins->save();

        $sponsors_winwins = new SponsorsWinwin();
        $sponsors_winwins->winwin_id = 4;
        $sponsors_winwins->sponsor_id = 1;
        $sponsors_winwins->ww_message = 'Me aceptas?';
        $sponsors_winwins->ww_accept = 1;
        $sponsors_winwins->sponsor_accept = 1;
        $sponsors_winwins->order = 3;
        $sponsors_winwins->save();

        $sponsors_winwins = new SponsorsWinwin();
        $sponsors_winwins->winwin_id = 5;
        $sponsors_winwins->sponsor_id = 1;
        $sponsors_winwins->sponsor_message = 'Me aceptas?';
        $sponsors_winwins->ww_accept = 0;
        $sponsors_winwins->sponsor_accept = 1;
        $sponsors_winwins->save();

        $sponsors_winwins = new SponsorsWinwin();
        $sponsors_winwins->winwin_id = 6;
        $sponsors_winwins->sponsor_id = 1;
        $sponsors_winwins->ww_message = 'Me aceptas?';
        $sponsors_winwins->ww_accept = 1;
        $sponsors_winwins->sponsor_accept = 0;
        $sponsors_winwins->save();


        $sponsor = new Sponsor();
        $sponsor->name = 'Ford'; 
        $sponsor->user_id = 100; 
        $sponsor->about = 'Ford - Find your way'; 
        $sponsor->contact_name = 'Mr. Ford'; 
        $sponsor->contact_phone = '22222222'; 
        $sponsor->contact_email = 'info@ford.com'; 
        $sponsor->type = 'Automotriz'; 
        $sponsor->cover_photo = 'ford.png'; 
        $sponsor->is_active = 1; 
        $sponsor->is_main = 1; 
        $sponsor->status = 'ACTIVE'; 
        $sponsor->photo = 'ford.jpg'; 
        $sponsor->save();



    }

}

