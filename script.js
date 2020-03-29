$("#search-button").on("click", function (event) {
    event.preventDefault();

    var inputEl = $("#input-city");
    var input = inputEl.val();
    console.log(input);
    localStorage.setItem("input", input);

    var prevSearch = localStorage.getItem("input");
    console.log(prevSearch);

    var searchHistBtn = $("<button>");
    searchHistBtn.text(prevSearch);
    $("#search-history").prepend(searchHistBtn);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=6271303875633c1ede72b0a41c1ebb3c";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(queryURL);
            console.log(response);

            $(".city").html("<h1>" + response.name + "</h1>");

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".temp").text("Temperature: " + tempF.toFixed(2) + " F");

            $(".wind").text("Wind Speed: " + response.wind.speed + "MPH");
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
                });

        });

    var forecastQueryURL = "api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=6271303875633c1ede72b0a41c1ebb3c";


});