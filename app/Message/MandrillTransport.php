<?php namespace Winwins\Message;

use Winwins\Message\Message;
use Winwins\Message\Transport;
use GuzzleHttp\ClientInterface;
 
class MandrillTransport implements Transport {
    private $key;
 
    private $client;
 
    private $options;
 
    private static $endpoint = "https://mandrillapp.com/api/1.0/messages/send-template.json";
 
    public function __construct($key, ClientInterface $client, array $options) {
        $this->key     = $key;
        $this->client  = $client;
        $this->options = $options;
    }

    public function request(Message $message) {
        $data = [
            'key'              => $this->key,
            'template_name'    => $message->template,
            'template_content' => []
        ];
     
        $message = array_merge($this->options, [
            'to' => $message->to,
            'global_merge_vars' => array_map(function ($content, $name) {
                return compact('name', 'content');
            }, $message->content, array_keys($message->content))
        ]);
     
        $json = array_merge($data, compact('message'));
     
        return compact('json');
    }

    public function send(Message $message) {
        $response = $this->client->post(self::$endpoint, $this->request($message));
        $message->sent();
        return $message;
    }


}
