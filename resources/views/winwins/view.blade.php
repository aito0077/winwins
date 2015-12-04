<!doctype html>
<html>
    <head>
        <meta name="author" content="{{ $winwin->user->detail->name }} {{ $winwin->user->detail->lastname }}"/>
        <meta property="og:title" content="{{ $winwin->title }}"/>
        <meta property="og:description" content="¿Si supieras que somos {{ $winwin->users_amount }} para {{ $winwin->what_we_do }} te sumarías?"/>
        <meta property="og:image" content="http://images.dev-winwins.net/{{ $winwin->image }}"/>
        <meta http-equiv="refresh" content="0;url='http://dev-winwins.net/#/winwin-view/{{ $winwin->id }}'">
    </head>
    <body>

    </body>
</html>
