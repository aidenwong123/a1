server.post('/FindResturant', (request, response) => {
   
    if(equest.body.queryResult.action == 'findmyfood')// if the request comes from findMyFood intent
    {
        if(request.body.originalDetectIntentRequest.payload.device){ // check if we have user's location
            var lat = request.body.originalDetectIntentRequest.payload.device.location.coordinates.latitude;
            var lon = request.body.originalDetectIntentRequest.payload.device.location.coordinates.longitude;
            var query = request.body.queryResult.parameters.cusine;
            getRestuarantList(request, response, query, lat, lon);
        }
        else // No location is provided, we need to ask the user for location permission 
        {
            var query = request.body.queryResult.parameters.cusine;
            getLocation(request, response, query);
        }
    }

    else if(request.body.queryResult.action == 'storelocation') // when the user responds to the location permission 
    {
        if(request.body.originalDetectIntentRequest.payload.device){// user agreed for permission
            var lat = request.body.originalDetectIntentRequest.payload.device.location.coordinates.latitude;
            var lon = request.body.originalDetectIntentRequest.payload.device.location.coordinates.longitude;
            var query = request.body.originalDetectIntentRequest.payload.user.userStorage;
            getRestuarantList(request, response, query, lat, lon);
        }
        else // user denied to give permission
        {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({
                "payload": {
                    "google": {
                        "expectUserResponse": false,
                        "richResponse": {
                            "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": "Sorry, I can not find restaurants near you without your location."
                                    }
                                }]}}}}));}}
   
    else if(request.body.queryResult.action == 'resturantinfo') // ask more information about the restaurant suggested
    {
        var lat = request.body.originalDetectIntentRequest.payload.device.location.coordinates.latitude;
        var lon = request.body.originalDetectIntentRequest.payload.device.location.coordinates.longitude;
        var query = request.body.queryResult.parameters.restaurant;
        getRestuarantInfo(request, response, query, lat, lon);
    }
});