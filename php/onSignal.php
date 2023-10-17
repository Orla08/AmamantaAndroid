<?php

/*
"headings": {"en": "Recordatorio '.$id.'"},
      "contents": {"en": "Recuerda amamantar al niño '.$id.'"}
*/ 
function send($id, $idDispositivo) {

  $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://onesignal.com/api/v1/notifications',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>'{
      "app_id": "7d3e4541-8271-4854-ae89-ee5c0167f395",
      "include_player_ids": ["'.$idDispositivo.'"],
      "data": {"foo": "bar"},
      "headings": {"en": "Recordatorio"},
      "contents": {"en": "Recuerda amamantar al niño"}
    }',
      CURLOPT_HTTPHEADER => array(
        'Cookie: __cf_bm=50Upbkwv5IavrA4VGeAk1.C4nflKYzBPfvszDogzYak-1696387270-0-AXcKRDEanC65iupvFx+tB/3zdsRFnASLH1Xoz9uHtoFzJuqLBv6hvUB3l5NhgwC9Hgr+Xy3ipzyvvbisU5Lcxy8=',
        'Content-Type: application/json',
        'Content-Type: application/json',
        'Authorization: Basic YjIyYjRhNzUtMDhjNi00MTMzLWFkZGEtN2MwNmExZjIwYjYx'
      ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;

}