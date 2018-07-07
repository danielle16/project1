

$(document).ready(function() {



    $("#test_button").on("click", function(event) {
        event.preventDefault;

      var searchTerm = $(".uk-search-input").val().trim();

        // Clear absolutely everything stored in localStorage using localStorage.clear()
      localStorage.clear();

      // Store the username into localStorage using "localStorage.setItem"
      localStorage.setItem("key", searchTerm);

      var searchTerm = localStorage.getItem("key");
      console.log(searchTerm);

    });  

});

console.log("hello");
console.log(localStorage.getItem("key"));

