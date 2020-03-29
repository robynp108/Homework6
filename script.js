
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

    function search(place) {

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

        var date1 = moment().add(1, "day").format("MM/DD/YYYY");
        var date2 = moment().add(2, "day").format("MM/DD/YYYY");
        var date3 = moment().add(3, "day").format("MM/DD/YYYY");
        var date4 = moment().add(4, "day").format("MM/DD/YYYY");
        var date5 = moment().add(5, "day").format("MM/DD/YYYY");
        
        $("#day-1").text(date1);
        $("#day-2").text(date2);
        $("#day-3").text(date3);
        $("#day-4").text(date4);
        $("#day-5").text(date5);

        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=6271303875633c1ede72b0a41c1ebb3c";



        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);

                var icon1Code = response.list[7].weather[0].icon;
                var icon2Code = response.list[15].weather[0].icon;
                var icon3Code = response.list[23].weather[0].icon;
                var icon4Code = response.list[31].weather[0].icon;
                var icon5Code = response.list[39].weather[0].icon;

                var icon1URL = "http://openweathermap.org/img/wn/" + icon1Code + "@2x.png";
                var icon2URL = "http://openweathermap.org/img/wn/" + icon2Code + "@2x.png";
                var icon3URL = "http://openweathermap.org/img/wn/" + icon3Code + "@2x.png";
                var icon4URL = "http://openweathermap.org/img/wn/" + icon4Code + "@2x.png";
                var icon5URL = "http://openweathermap.org/img/wn/" + icon5Code + "@2x.png";

                $("#day1-icon").attr("src", icon1URL);
                $("#day2-icon").attr("src", icon2URL);
                $("#day3-icon").attr("src", icon3URL);
                $("#day4-icon").attr("src", icon4URL);
                $("#day5-icon").attr("src", icon5URL);

                var temp1F = (response.list[7].main.temp - 273.15) * 1.80 + 32;
                var temp2F = (response.list[15].main.temp - 273.15) * 1.80 + 32;
                var temp3F = (response.list[23].main.temp - 273.15) * 1.80 + 32;
                var temp4F = (response.list[31].main.temp - 273.15) * 1.80 + 32;
                var temp5F = (response.list[39].main.temp - 273.15) * 1.80 + 32;

                $("#day1-temp").text("Temperature: " + temp1F.toFixed(2) + " F");
                $("#day2-temp").text("Temperature: " + temp2F.toFixed(2) + " F");
                $("#day3-temp").text("Temperature: " + temp3F.toFixed(2) + " F");
                $("#day4-temp").text("Temperature: " + temp4F.toFixed(2) + " F");
                $("#day5-temp").text("Temperature: " + temp5F.toFixed(2) + " F");

                $("#day1-hum").text("Humidity: " + response.list[7].main.humidity + "%");
                $("#day2-hum").text("Humidity: " + response.list[15].main.humidity + "%");
                $("#day3-hum").text("Humidity: " + response.list[23].main.humidity + "%");
                $("#day4-hum").text("Humidity: " + response.list[31].main.humidity + "%");
                $("#day5-hum").text("Humidity: " + response.list[39].main.humidity + "%");

            })
    };

    search(input);

    searchHistBtn.on("click", function (event) {
        event.preventDefault();
        var place = $(this).attr("id");
        search(place);
    });

});

