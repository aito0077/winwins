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
        $language->iso_code = 'es_ES';
        $language->description = 'Español';
        $language->save();

        $language = new Language();
        $language->name = 'EN';
        $language->iso_code = 'en';
        $language->description = 'English';
        $language->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'user_not_found';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 1;
        $translation->text = 'Usuario no encontrado';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 1;
        $translation->text = 'user_not_found';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'auth_wrong_email_password';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 2;
        $translation->text = 'Usuario/password no correctos';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 2;
        $translation->text = 'auth_wrong_email_password';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'email_already_taken';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 3;
        $translation->text = 'El correo ya existe';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 3;
        $translation->text = 'email_already_taken';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'join_as_owner_already_joined';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 4;
        $translation->text = 'Como creador ya se encuentra unido';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 4;
        $translation->text = 'join_as_owner_already_joined';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'join_already_joined';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 5;
        $translation->text = 'Ya se encuentra unido';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 5;
        $translation->text = 'join_already_joined';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'left_owner_cant';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 6;
        $translation->text = 'Como creador no puede abandonar';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 6;
        $translation->text = 'left_owner_cant';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'left_first_join';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 7;
        $translation->text = 'No se encuentra unido';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 7;
        $translation->text = 'left_first_join';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'group_add_winwin_already_joined';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 8;
        $translation->text = 'El Winwin ya se encuentra sumado';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 8;
        $translation->text = 'group_add_winwin_already_joined';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'group_remove_winwin_not_joined';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 9;
        $translation->text = 'El Winwin no pertenece al grupo';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 9;
        $translation->text = 'group_remove_winwin_not_joined';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'you_are_not_an_sponsor';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 10;
        $translation->text = 'Usted no es sponsor';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 10;
        $translation->text = 'you_are_not_an_sponsor';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'you_are_already_sponsored_this_group';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 11;
        $translation->text = 'Ya se encuentra esponsoreando al grupo';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 11;
        $translation->text = 'you_are_already_sponsored_this_group';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'you_are_not_an_sponsor';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 12;
        $translation->text = 'Usted no es un sponsor';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 12;
        $translation->text = 'you_are_not_an_sponsor';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'operation_not_until_activate_account';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 13;
        $translation->text = 'No puede realizar esta operacion hasta que no confirme su cuenta';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 13;
        $translation->text = 'operation_not_until_activate_account';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'join_already_join';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 14;
        $translation->text = 'Ya se encuentra unido';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 14;
        $translation->text = 'join_already_join';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'winwin_at_least_one_post_to_activate';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 15;
        $translation->text = 'Debe realizar un primer post para activar el Winwin';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 15;
        $translation->text = 'winwin_at_least_one_post_to_activate';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'winwin_you_are_not_the_admin';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 16;
        $translation->text = 'No es administrador de este Winwin para realizar la operacion';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 16;
        $translation->text = 'winwin_you_are_not_the_admin';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'winwin_you_are_not_an_sponsor';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 17;
        $translation->text = 'No es sponsor para realizar esta operacion';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 17;
        $translation->text = 'winwin_you_are_not_an_sponsor';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'winwin_you_are_already_sponsored_this_winwin';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 18;
        $translation->text = 'Ya se encuentra esponsoreando este Winwin';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 18;
        $translation->text = 'winwin_you_are_already_sponsored_this_winwin';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'winwin_is_already_sponsored_this_winwin';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 19;
        $translation->text = 'Ya se encuentra esponsoreando este Winwin';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 19;
        $translation->text = 'winwin_is_already_sponsored_this_winwin';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'winwin_only_owner_can_close';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 20;
        $translation->text = 'Solo el creador puede cerrar este Winwin';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 20;
        $translation->text = 'winwin_only_owner_can_close';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'user_current_password_wrong';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 21;
        $translation->text = 'Clave actual incorrecta';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 21;
        $translation->text = 'user_current_password_wrong';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'follow_not_logged';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 22;
        $translation->text = 'No ha ingresado al sitio';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 22;
        $translation->text = 'follow_not_logged';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'follow_not_himself';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 23;
        $translation->text = 'No puede seguirse a usted mismo';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 23;
        $translation->text = 'follow_not_himself';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'follow_already_folllowing';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 24;
        $translation->text = 'Ya se encuentra siguiendo a este usuario';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 24;
        $translation->text = 'follow_already_folllowing';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'follow_follow_first_to_unfollow';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 25;
        $translation->text = 'Usted no se encuentra siguiendo a esta persona';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 25;
        $translation->text = 'follow_follow_first_to_unfollow';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'sponsor_not_found';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 26;
        $translation->text = 'Sponsor no encontrado';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 26;
        $translation->text = 'sponsor_not_found';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'sponsor_as_owner_you_are_aleady_following';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 27;
        $translation->text = 'No se puede seguir a usted mismo';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 27;
        $translation->text = 'sponsor_as_owner_you_are_aleady_following';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'sponsor_already_following';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 28;
        $translation->text = 'Ya se encuntra siguiendo';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 28;
        $translation->text = 'sponsor_already_following';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'sponsor_owner_cant_left';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 29;
        $translation->text = 'No puede dejar de seguirse';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 29;
        $translation->text = 'sponsor_owner_cant_left';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'sponsor_left_first_follow';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 30;
        $translation->text = 'No se encuntra siguiendo';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 30;
        $translation->text = 'sponsor_left_first_follow';
        $translation->save();

        $namespace = new TranslateNamespace();
        $namespace->type = 'GLOBAL';
        $namespace->module = 'error';
        $namespace->key = 'not_sponsor_user';
        $namespace->save();

        $translation = new TranslateValue();
        $translation->language_id = 1;
        $translation->namespace_id = 31;
        $translation->text = 'No es sponsor';
        $translation->save();

        $translation = new TranslateValue();
        $translation->language_id = 2;
        $translation->namespace_id = 31;
        $translation->text = 'not_sponsor_user';
        $translation->save();


    }

}
