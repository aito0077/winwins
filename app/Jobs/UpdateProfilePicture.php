<?php

namespace Winwins\Jobs;

use Winwins\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldQueue;
use Winwins\User;
use Storage;

class UpdateProfilePicture extends Job implements SelfHandling, ShouldQueue {
    use InteractsWithQueue, SerializesModels;

    protected $user;

    public function __construct(User $user) {
        $this->user = $user;
    }

    public function handle() {
        $gravatar = md5(strtolower(trim($this->user->email)));
        $detail = $this->user->detail;
        $detail->photo = $gravatar;
        $this->user->detail()->save($detail);
        Storage::disk('s3-gallery')->put('/' . $gravatar, file_get_contents('http://www.gravatar.com/avatar/'.$gravatar.'?d=identicon'), 'public');
        if ($this->attempts() > 1) {
            $this->release(2);
        }

    }
}
