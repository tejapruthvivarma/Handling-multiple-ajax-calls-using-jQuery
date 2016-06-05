<?php

$response = mt_rand(100,999);
$sleep = mt_rand(1,5);

sleep($sleep);

echo $response;