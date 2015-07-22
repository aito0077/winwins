<?php
use Illuminate\Database\Seeder;
use Winwins\Model\WinwinsUser;

class WinwinsUsersTableSeeder extends Seeder {

    public function run() {
        DB::table('winwins_users')->delete();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "45";
        $winwins_user->winwin_id = 2;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "113";
        $winwins_user->winwin_id = 3;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "57";
        $winwins_user->winwin_id = 4;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "71";
        $winwins_user->winwin_id = 5;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "61";
        $winwins_user->winwin_id = 6;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "92";
        $winwins_user->winwin_id = 7;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "28";
        $winwins_user->winwin_id = 8;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "114";
        $winwins_user->winwin_id = 9;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "114";
        $winwins_user->winwin_id = 10;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "106";
        $winwins_user->winwin_id = 11;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "104";
        $winwins_user->winwin_id = 12;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "67";
        $winwins_user->winwin_id = 13;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "22";
        $winwins_user->winwin_id = 14;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "36";
        $winwins_user->winwin_id = 15;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "112";
        $winwins_user->winwin_id = 16;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "83";
        $winwins_user->winwin_id = 17;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "76";
        $winwins_user->winwin_id = 18;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "11";
        $winwins_user->winwin_id = 19;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "106";
        $winwins_user->winwin_id = 20;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "111";
        $winwins_user->winwin_id = 21;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "42";
        $winwins_user->winwin_id = 22;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "42";
        $winwins_user->winwin_id = 23;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "16";
        $winwins_user->winwin_id = 24;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "70";
        $winwins_user->winwin_id = 25;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "66";
        $winwins_user->winwin_id = 26;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "40";
        $winwins_user->winwin_id = 27;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "23";
        $winwins_user->winwin_id = 28;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "105";
        $winwins_user->winwin_id = 29;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "86";
        $winwins_user->winwin_id = 30;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "113";
        $winwins_user->winwin_id = 31;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "61";
        $winwins_user->winwin_id = 32;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "90";
        $winwins_user->winwin_id = 33;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "20";
        $winwins_user->winwin_id = 34;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "90";
        $winwins_user->winwin_id = 35;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "89";
        $winwins_user->winwin_id = 36;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "51";
        $winwins_user->winwin_id = 37;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "111";
        $winwins_user->winwin_id = 38;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "30";
        $winwins_user->winwin_id = 39;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "66";
        $winwins_user->winwin_id = 40;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "117";
        $winwins_user->winwin_id = 41;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "14";
        $winwins_user->winwin_id = 42;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "94";
        $winwins_user->winwin_id = 43;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "57";
        $winwins_user->winwin_id = 44;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "3";
        $winwins_user->winwin_id = 45;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "91";
        $winwins_user->winwin_id = 46;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "73";
        $winwins_user->winwin_id = 47;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "96";
        $winwins_user->winwin_id = 48;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "11";
        $winwins_user->winwin_id = 49;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "17";
        $winwins_user->winwin_id = 50;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "54";
        $winwins_user->winwin_id = 51;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "94";
        $winwins_user->winwin_id = 52;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "59";
        $winwins_user->winwin_id = 53;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "16";
        $winwins_user->winwin_id = 54;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "27";
        $winwins_user->winwin_id = 55;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "89";
        $winwins_user->winwin_id = 56;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "116";
        $winwins_user->winwin_id = 57;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "65";
        $winwins_user->winwin_id = 58;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "102";
        $winwins_user->winwin_id = 59;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "66";
        $winwins_user->winwin_id = 60;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "107";
        $winwins_user->winwin_id = 61;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "112";
        $winwins_user->winwin_id = 62;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "112";
        $winwins_user->winwin_id = 63;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "102";
        $winwins_user->winwin_id = 64;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "50";
        $winwins_user->winwin_id = 65;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "68";
        $winwins_user->winwin_id = 66;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "68";
        $winwins_user->winwin_id = 67;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "10";
        $winwins_user->winwin_id = 68;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "96";
        $winwins_user->winwin_id = 69;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "80";
        $winwins_user->winwin_id = 70;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "110";
        $winwins_user->winwin_id = 71;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "64";
        $winwins_user->winwin_id = 72;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "115";
        $winwins_user->winwin_id = 73;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "9";
        $winwins_user->winwin_id = 74;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "73";
        $winwins_user->winwin_id = 75;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "90";
        $winwins_user->winwin_id = 76;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "108";
        $winwins_user->winwin_id = 77;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "24";
        $winwins_user->winwin_id = 78;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "42";
        $winwins_user->winwin_id = 79;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "17";
        $winwins_user->winwin_id = 80;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "84";
        $winwins_user->winwin_id = 81;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "122";
        $winwins_user->winwin_id = 82;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "110";
        $winwins_user->winwin_id = 83;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "58";
        $winwins_user->winwin_id = 84;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "87";
        $winwins_user->winwin_id = 85;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "11";
        $winwins_user->winwin_id = 86;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "45";
        $winwins_user->winwin_id = 87;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "67";
        $winwins_user->winwin_id = 88;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "77";
        $winwins_user->winwin_id = 89;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "62";
        $winwins_user->winwin_id = 90;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "35";
        $winwins_user->winwin_id = 91;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "41";
        $winwins_user->winwin_id = 92;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "104";
        $winwins_user->winwin_id = 93;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "23";
        $winwins_user->winwin_id = 94;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "50";
        $winwins_user->winwin_id = 95;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "60";
        $winwins_user->winwin_id = 96;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "24";
        $winwins_user->winwin_id = 97;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "66";
        $winwins_user->winwin_id = 98;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "11";
        $winwins_user->winwin_id = 99;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "104";
        $winwins_user->winwin_id = 100;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "117";
        $winwins_user->winwin_id = 101;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "27";
        $winwins_user->winwin_id = 102;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "32";
        $winwins_user->winwin_id = 103;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "77";
        $winwins_user->winwin_id = 104;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "42";
        $winwins_user->winwin_id = 1;
        $winwins_user->moderator = 1;
        $winwins_user->save();

        $winwins_user = new WinwinsUser();
        $winwins_user->user_id = "102";
        $winwins_user->winwin_id = 1;
        $winwins_user->moderator = 1;
        $winwins_user->save();



    }

}

