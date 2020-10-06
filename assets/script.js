//Creating an array to store previous ciites
var citiesArray = [""];


function displayCityInfo() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citiesArray + "&appid=6bea86f7077bbaa41636b51c145ab54f"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        $("#weatherContainer").text(JSON.stringify(response));
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


$("#btn").on("click", function(event) {
    event.preventDefault();
    //Stores user input into a variable
    var userInput = $("#cityInput").val().trim();

    citiesArray.push(userInput);

    submitButton();

})

$(document).on("click", ".city", displayCityInfo);

//And 5-day Forecast

// Temp = response.main.temp
// Humidity = response.main.humidity
// Wind = response.wind
// UV Index =