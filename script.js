
$("#search-button").on("click", function (event) {
    event.preventDefault();

    var inputEl = $("#input-city");
    var input = inputEl.val();
    console.log(input);

    localStorage.setItem("input", input);

    var prevSearch = localStorage.getItem("input");
    console.log(prevSearch);

    var searchHistBtn = $("<button>");
    searchHistBtn.addClass("searchBtns");
    searchHistBtn.attr("id", input);
    searchHistBtn.text(prevSearch);
    $("#search-history").prepend(searchHistBtn);
    
    function search (place) {

    var date = moment().format("MM/DD/YYYY");
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=6271303875633c1ede72b0a41c1ebb3c";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(queryURL);
            console.log(response);

            var iconCode = response.weather[0].icon;
            console.log(iconCode);
            var iconTodayURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

            //$(".city").html("<h2>" + response.name + ": " + date + "</h2>");
            $("#city").text(response.name + ": " + date);
            $("#icon").attr("src", iconTodayURL);

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".temp").text("Temperature: " + tempF.toFixed(2) + " F");

            $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
            $(".humidity").text("Humidity: " + response.main.humidity + "%");

            var inputLat = response.coord.lat;
            var inputLon = response.coord.lon;
            console.log(inputLat);
            console.log(inputLon);

            var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=6271303875633c1ede72b0a41c1ebb3c&lat=" + inputLat + "&lon=" + inputLon;

            $.ajax({
                url: UVqueryURL,
                method: "GET"
            })
                .then(function (UVresponse) {
                    console.log(UVresponse);

                    $("#uv-index").text(UVresponse.value);

                    if (UVresponse.value < 3) {
                        $("#uv-index").addClass("very-low");
                    } else if (UVresponse.value >= 3 && UVresponse.value < 5) {
                        $("#uv-index").addClass("low");
                    } else if (UVresponse.value >= 5 && UVresponse.value < 7) {
                        $("#uv-index").addClass("moderate");
                    } else if (UVresponse.value >= 7 && UVresponse.value < 10) {
                        $("#uv-index").addClass("high");
                    } else {
                        $("#uv-index").addClass("very-high");
                    }
                });

        });

    //var forecastQueryURL = "api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=6271303875633c1ede72b0a41c1ebb3c";
    };

    search (input);
   
    searchHistBtn.on("click", function (event) {
        event.preventDefault();
        var place = $(this).attr("id");
        search (place);
    });   

});

