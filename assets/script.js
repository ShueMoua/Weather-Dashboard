//Creating an array to store previous ciites
var citiesArray = JSON.parse(localStorage.getItem("local")) || [];


function displayCityInfo(userInput) {
    //Clear previous search
    $("#weatherContainer").empty()



    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial&appid=6bea86f7077bbaa41636b51c145ab54f"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        if (citiesArray.indexOf(userInput) == -1) {
            citiesArray.push(userInput);
            localStorage.setItem("local", JSON.stringify(citiesArray));
            submitButton();
        }
        // http://openweathermap.org/img/wn/10d@2x.png
        var icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        var iconEle = $("<img>");
        iconEle.attr("src", icon)
            // add date here to the name
            // var day
        var lat = response.coord.lat;

        var lon = response.coord.lon;

        var name = response.name;

        var nameEle = $("<h2>").text(name);

        $("#weatherContainer").append(nameEle);

        $("#weatherContainer").append(iconEle);

        var temp = response.main.temp;

        var pOne = $("<p>").text("Temperature: " + temp);

        $("#weatherContainer").append(pOne);

        var humid = response.main.humidity;

        var pTwo = $("<p>").text("Humidity: " + humid + "%");

        $("#weatherContainer").append(pTwo);

        var wind = response.wind.speed;

        var pThree = $("<p>").text("Wind Speed: " + wind + " mph");

        $("#weatherContainer").append(pThree);
        UVDisplay(lat, lon);
    })
}

function submitButton() {
    //Deleting cities prior to adding new cities
    $(".cityList").empty();

    for (var i = 0; i < citiesArray.length; i++) {
        var cityBtn = $("<button>");
        cityBtn.addClass("city");
        cityBtn.attr("data-name", citiesArray[i]);
        cityBtn.text(citiesArray[i]);
        $(".cityList").prepend(cityBtn);

    }

}

submitButton();

$("#btn").on("click", function(event) {
    event.preventDefault();
    //Stores user input into a variable
    var userInput = $("#cityInput").val().trim();



    // citiesArray.push(userInput);

    displayCityInfo(userInput);

})

$(".cityList").on("click", ".city", function() {
    var userInput = $(this).attr("data-name");
    displayCityInfo(userInput);
    displayForecast(userInput);
});

//And 5-day Forecast

// Temp = response.main.temp
// Humidity = response.main.humidity
// Wind = response.wind
// UV Index =

function displayForecast(userInput) {
    // var userInput = $(this).attr("data-name");
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=6bea86f7077bbaa41636b51c145ab54f"

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(data) {
        console.log(data);
        var forecast = data.list
        $("#forecastContainer").empty()
        for (var i = 0; i < forecast.length; i = i + 8) {
            $("#forecastContainer").append(`<div class='card'>
           <p>${forecast[i].dt}</p>
           <img src ="" />
           <p>Temp:${forecast[i].main.temp}</p>
           <p>Humidity: ${forecast[i].main.humidity}</p></div>`)
            console.log(i)


        }

    })
}

function UVDisplay(lat, lon) {
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=6bea86f7077bbaa41636b51c145ab54f"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        $("#weatherContainer").append("UV: " + response.value)
    })
}