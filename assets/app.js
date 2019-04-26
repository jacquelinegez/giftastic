$(document).ready(function() {
  var topics = [];
  
    
     function displayGifs() {
  
    var reactions = $(this).data("search");
    console.log(reactions);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +  reactions  + "&api_key=tKcolmkbRA6lDos7BMDL1JtiXdhxfBIn&limit=10";

    console.log(queryURL);
  
    $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
            
            var showDiv = $("<div class='col-md-4'>");
  
            var rating = results[i].rating;
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var showImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
  
            showImage.attr("src", staticSrc);
            showImage.addClass("reactionsGiphy");
            showImage.attr("data-state", "still");
            showImage.attr("data-still", staticSrc);
            showImage.attr("data-animate", defaultAnimatedSrc);
            showDiv.append(p);
            showDiv.append(showImage);
            $("#gifArea").prepend(showDiv);
  
          }
    });
  }

    $("#searchReaction").on("click", function(event) {
          event.preventDefault();
          var addReaction = $("#inputReaction").val().trim();
          topics.push(addReaction);
          console.log(topics);
          $("#inputReaction").val('');
          displayButtons();
        });

    function displayButtons() {
      $("#myButtons").empty();
      for (var i = 0; i < topics.length; i++) {
        var a = $('<button class="btn btn-info">');
        a.attr("id", "reaction");
        a.attr("data-search", topics[i]);
        a.text(topics[i]);
        $("#myButtons").append(a);
      }
    }

    displayButtons();
  
    $(document).on("click", "#reaction", displayGifs);
    $(document).on("click", ".reactionsGiphy", pausePlayGifs);
  

    function pausePlayGifs() {
       var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
    }
  }
  });

  