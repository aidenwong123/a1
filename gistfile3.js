function getRestuarantList(request, response, query, lat, lon){ // hits the zomato API
    var req = unirest("GET", "https://developers.zomato.com/api/v2.1/search?count="+numberOfResults+"&lat="+lat+"&lon="+lon+"&radius="+radius+"&q=" + query)
    req.header("Accept", 'application/json').header('user-key', api_key).end(function(res){
                if(res.error) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({
                        "speech" : "Error. Can you try it again ? ",
                        "displayText" : "Error. Can you try it again ? "
                    }));
                } 
                else if(res) {   
                    var restaurants = res.body.restaurants;
                    var resultAudio = 'You can eat ' + query + ' at ';
                    restaurants.forEach((result, index) => {
                        resultAudio = resultAudio + result.restaurant.name + ((numberOfResults - 1) == index ? '.' : ', ')
                    });
                    response.setHeader('Content-Type', 'application/json');
                    response.send(JSON.stringify({
                        "payload": {
                            "google": {
                                "expectUserResponse": true,
                                "richResponse": {
                                    "items": [{
                                        "simpleResponse": {
                                            "textToSpeech": resultAudio
                                        }
                                    }]
                                }
                            }}}));}});}