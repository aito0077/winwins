<?php namespace Winwins\Http\Middleware;

use Closure;
use Request;
use Log;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;
use Illuminate\Session\TokenMismatchException;
use Symfony\Component\Security\Core\Util\StringUtils;

class VerifyCsrfToken extends BaseVerifier {

    protected $except = [
        'api/*'
    ];

	public function handle($request, Closure $next) {
        //ToDo: Workaround for this 
        if (Request::is('auth/*')) {
            return $next($request);
        } else {

		/*
		if (parent::isReading($request) || $this->tokensMatch($request)) {
			return parent::addCookieToResponse($request, $next($request));
		}

		throw new TokenMismatchException;
		*/

            return parent::handle($request, $next);
        }
        
    }

	protected function __tokensMatch($request) {
		$token = $request->input('_token') ?: $request->header('X-CSRF-TOKEN');

		if ( ! $token && $header = $request->header('X-XSRF-TOKEN')) {
			$token = $this->encrypter->decrypt($header);
		}

		Log::info('Token:aftp '.$token);
		Log::info('Token: session'.$request->session()->token());
		return StringUtils::equals($request->session()->token(), $token);
	}


}
