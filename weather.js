$("form").submit(function(e) {
    e.preventDefault();

    if($("#location").val().length === 0) {
        $("small").fadeIn().removeClass("d-none");
    }

    $location = $("#location").val();
    getWeatherId($location);

    function getWeatherId($location) {
        // AccuWeather API Key
        $API_KEY = "w1cLV9dDNDnv5L9SKOW1YsP8a8t0rt8m";

        $.getJSON( "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + $API_KEY +"&q="+ $location +"", function(data) {
         }).done(function(data) {
             return data[0].Key; // Get the first location ID 
         })
         .fail(function() {
           console.log( "Error with fetching location data" );
         });
    }

});