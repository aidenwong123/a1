function getLocation(request, response, query){
    response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": "PLACEHOLDER"
                                    }
                                }
                            ]
                            },
                        "systemIntent" : {
                            "intent" : "actions.intent.PERMISSION", 
                            "inputValueData" : {
                                "@type": "type.googleapis.com/google.actions.v2.PermissionValueSpec",
                                "permissions" : [ "DEVICE_PRECISE_LOCATION" ], 
                                "optContext" : "To serve you better" 
                            }
                          }, 
                          "userStorage" : query
                        }
                      }
                }));
}
