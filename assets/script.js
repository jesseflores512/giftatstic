		$(document).ready(function() {
				var dogList = ["german shepard", "chihuahua", "daschund", "labrador", "poodle"];

	function displayGifs() {
        var searchTerm = $(this).attr("data-name");
        console.log(searchTerm);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);

            $("#gifsHere").empty();

            var results = response.data;
            var gifDiv;
            var rating;
            var p;
            var image;
            for (var i = 0; results.length; i++) {
                gifDiv = $("<div class='gifItem'>");
                rating = results[i].rating;
                p = $("<p>").text("Rating: " + rating);
                image = $("<img>");
                image.addClass("gif");
                image.attr("data-state", "still");
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("src", results[i].images.fixed_height_still.url);
                gifDiv.append(p);
                gifDiv.append(image);

                $("#gifsHere").prepend(gifDiv);
            }
        });
    } 

    function makeButtons() {

        $("#buttonsHere").empty();
  
        for (var i = 0; i < dogList.length; i++) {
            var button = $("<button>");
            button.addClass("gifButton");
            button.attr("data-name", dogList[i]);
            button.text(dogList[i]);
            $("#buttonsHere").append(button);
        }
    } 


    $("#btn").click(function(event) {

        event.preventDefault();

        var searchInput = $("#dogInput").val().trim();

        dogList.push(searchInput);

        makeButtons();
    });

    function toggle() {
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        console.log(state);
    } 
    $(document).on("click", ".gifButton", displayGifs);
    $(document).on("click", ".gif", toggle)
    makeButtons();

	});



