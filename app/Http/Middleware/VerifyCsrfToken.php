<?php namespace Winwins\Http\Middleware;

use Closure;
use Request;
use Log;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;
use Illuminate\Session\TokenMismatchException;

class VerifyCsrfToken extends BaseVerifier {

	public function handle($request, Closure $next) {
        Log::info(Request::path());
        if (Request::is('auth/signup')) {
            Log::info('Is signup');
            return $next($request);
        } else {
            return parent::handle($request, $next);
        }
        
    }

}
