$("#search-button").on("click", function(event) {
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



    
  });