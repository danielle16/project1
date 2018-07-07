$('document').ready(function(){

    function getReddit() {

        // should be taken from user input--the game they're seaching for.
        // var searchTerm is commented out so as not to reset the input
        // var searchTerm = '';

        // any empty var to hold our subReddit result's name
        var subReddit = ""

        // ajax call to search for relevant subreddits
        $.ajax(
        
            "https://www.reddit.com/subreddits/search.json",
        
            // this syntax is a little foreign to me but it works
            { data: {
            
                q: searchTerm 
            
                }, success: function(responseData) {
            
                    if (responseData.data.children.length > 0) {

                        // this is where we'll plug in our feed search query.
                        subReddit = responseData.data.children[0].data.url;

                        // url for new ajax call with the subReddit inserted into it
                        var feedQuery = "https://www.reddit.com" + subReddit + "top.json"

                        // new ajax call to search for top posts in this specific subreddit
                        $.ajax({
                            url: feedQuery,
                            method: "GET"
                        }).then(function(response){
        
                            console.log(response)

                            // returns an array of top posts
                            var subR = response.data.children;

                            console.log(subR);

                            // for loop to pull the top 20 posts
                            for (i=0; i <= 20; i++) {

                                // variable the text
                                var title = subR[i].data.title

                                // variable for a link to the post
                                var link = "https://www.reddit.com/" + subR[i].data.permalink;

                                // making some variables to include the elements that will need to be added to the html
                                // the div that will hold everything else
                                var newThread = $("<div>");

                                // where the text goes
                                var newHead = $("<h3>");

                                // where the link goes
                                var newLink = $("<a>");

                                // and now filling it all in
                                newHead.html(title);

                                newLink.attr("href", link);

                                newLink.attr("target", "blank");

                                newLink.html("Link and Comments")

                                // appending our elements the div
                                newThread.append(newHead);

                                newThread.append(newLink);

                                // appending our div to the html by id
                                $("#reddit-content").append(newThread)

                            }

                        });

                    } 
        
                },
    
            }

        // end reddit-js script
        ); 

    };

// end document ready function
});
