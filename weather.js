$("form").submit(function(e) {
    e.preventDefault();

    if($("#location").val().length === 0) {
        // Error message for empty input
        $("small").fadeIn().removeClass("d-none").append("You must ender a location.");
    } else {
        $location = $("#location").val();
        getWeatherId($location);
    }

    function getWeatherId(location) {
        // AccuWeather API Key
        $API_KEY = "w1cLV9dDNDnv5L9SKOW1YsP8a8t0rt8m";

        $.getJSON("https://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + $API_KEY +"&q="+ $location +"", function(data) {
         }).done(function(data) {
            if(data.length > 1)
            {  
                getWeather(data[0].Key); // Get the first location  
            } else {
                // Unable to get location
                $("small").fadeIn().removeClass("d-none").append("No location found.");
            }
         })
         .fail(function() {
             // Error grabbing JSON
             $("small").fadeIn().removeClass("d-none").append("Unable to fetch weather, please try again later.");
         });
    }

    function getWeather(locationId) {
        $.getJSON("https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/"+ locationId +"?apikey="+ $API_KEY +"&metric=true", function(data) {
        }).done(function(data) {
            console.log(data);
        })
        .fail(function() {
            // Error grabbing JSON
            $("small").fadeIn().removeClass("d-none").append("Unable to fetch weather, please try again later.");
        });
    }

});