// Submit Form
$("form").submit(function(e) {
  e.preventDefault();

  if($("#location").val().length === 0) {
    // Clear existing error messages
    $("#error").empty();

    // Error message for empty input
    $error = "<strong>Error:</strong> You must enter a location.";
    $("#error").append($error).removeClass("d-none");
  } else {
      $location = $("#location").val();
      getWeatherId($location);
  }

  // Clear the Search form
  $("#location").val("");

  function getWeatherId(location) {
    // AccuWeather API Key
    $API_KEY = "QArI4UAzxNPpSIfwFFVuASpoYtm8c2OX";

    $.getJSON("https://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + $API_KEY +"&q="+ $location +"", function(data) {
      }).done(function(data) {
        if(data.length > 1)
        {  
          getWeather(data[0].Key); // Get the first location

          // Clear existing error messages
          $("#error").empty();
        } else {
          // Clear existing error messages
          $("#error").empty();

          // Unable to get location
          $error = "<strong>Error: </strong>No location found."
          $("#error").append($error).removeClass("d-none");
        }
      })
      .fail(function() {
        // Clear existing error messages
        $("#error").empty();

        // Error grabbing JSON
        $error = "There was a problem retrieving the Weather, please try again at a later time."
        $("#error").append($error).removeClass("d-none");
      });
    }

  function getWeather(locationId) {
    $.getJSON("http://dataservice.accuweather.com/currentconditions/v1/"+ locationId +"?apikey="+ $API_KEY +"&metric=true", function(data) {
    }).done(function(data) {

      // Check if raining
      if(data[0].HasPrecipitation)
      {
          $rainStatus = "<i class=\"bi bi-rain-fill\"></i> <span class=\"m-2\">Currently raining</span>";
      } else {
          $rainStatus = "<i class=\"bi bi-sun-fill\"></i> <span class=\"m-2\">Not raining</span>";
      }

      // Check if day or night
      if(data[0].IsDayTime) {
          $dayTimeStatus = "<i class=\"bi bi-sun\"></i> <span class=\"m-2\">Day-time</span>";
      } else {
          $dayTimeStatus = "<i class=\"bi bi-moon-stars\"></i> <span class=\"m-2\">Night-time</span>";
      }

      $("#weather").append(`
      <div class="col-lg-4 my-2 weatherCard">

        <div class="card">
          <div class="card-body px-4">

            <div class="d-flex">
              <h6 class="flex-grow-1 text-capitalize">`+ $location +`</h6>
            </div>

            <div class="d-flex flex-column text-center mt-5 mb-4">
              <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> `+ Math.floor(data[0].Temperature.Metric.Value) +`°C </h6>
              <span class="small" style="color: #868B94">`+ data[0].WeatherText +`</span>
            </div>

            <div class="d-flex align-items-center">
              <div class="flex-grow-1" style="font-size: 1rem;">
                <div>`+ $rainStatus +`</div>
                <div>`+ $dayTimeStatus +`</div>
              </div>
              <div>
                <img src="./images/icons/`+ data[0].WeatherIcon +`.png" width="100px" />
              </div>
            </div>

          </div>
        </div>

      </div>
      `);
    })
    .fail(function() {
      // Clear existing error messages
      $("#error").empty();
      
      // Error grabbing JSON
      $error = "There was a problem retrieving the Weather, please try again at a later time."
      $("#error").append($error).removeClass("d-none");
    });
  }
});

// Clear Weather Button
$("#clearWeather").click(function() {
  $(".weatherCard").remove();
});