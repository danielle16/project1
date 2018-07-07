var searchTerm = localStorage.getItem("key");
console.log(searchTerm);
$(document).ready(function() {

var game_id_array = [];
var user_id_array = [];
var thumbnail_url_array = [];
var display_name_array = [];


function getStreamsData() {

//TYPE IN THE NAME OF THE GAME AND TWITCH API TRANSLATES TO GAME_ID ===================================

   $.ajax({
   type: 'GET',
   url: 'https://api.twitch.tv/helix/games?name=' + searchTerm,
   headers: {'Client-ID': 'cjtqp2tws4hg9emvvxzhmmsjajbh1e'},
   success: function(response) {
       console.log(response);
       
   }
}).then(function(response) {

   var results_game = response.data;

   //for (var p = 0; p <= 5; p++) {
           var game_id = results_game[0].id;
           console.log(game_id);
           game_id_array.push(game_id);
           console.log(game_id_array[0]);
 
       //}

var searchTerm_to_GameId = game_id_array[0]; //game_id_array[0];
console.log(game_id_array[0]);

//TWITCH API TAKES GAME_ID AND SEARCHES FOR LIVE STREAMS =================================================
$.ajax({
   type: 'GET',
   url: 'https://api.twitch.tv/helix/streams?game_id=' + searchTerm_to_GameId + '&limit=100',
   headers: {'Client-ID': 'cjtqp2tws4hg9emvvxzhmmsjajbh1e'},
   success: function(response) {
       console.log(response);
       
   }
}).then(function(response) {

   var results = response.data;

   for (var i = 0; i <= 5; i++) {
           var user_id = results[i].user_id;
           //console.log(user_id);
           user_id_array.push(user_id);

           var thumbnail_url = results[i].thumbnail_url;
           thumbnail_url_array.push(thumbnail_url);
 
       }

       // TWITCH API TAKES STREAMS JSON AND RETRIEVES USER JSON DATA FROM TWITCH API ==================================
        for (var j = 0; j < user_id_array.length; j++) {
               var user_console = user_id_array[j];
               console.log(user_console);

                   $.ajax({
                   type: 'GET',
                   url: 'https://api.twitch.tv/helix/users?id=' + user_console,
                   headers: {'Client-ID': 'cjtqp2tws4hg9emvvxzhmmsjajbh1e'},
                   success: function(response) {
                   //console.log(response);
       
                   }
                   }).then(function(response) {

                   
                   var results_users = response.data;

                   for (var k = 0; k < results_users.length; k++) {
                       var console_result = results_users[k].display_name;
                   
                   }
                   display_name_array.push(console_result);
                   //console.log(console_result);

                   //AFTER GRABBING DISPLAY_NAME PROPERTY FROM USER JSON, CREATE IFRAMES TO DISPLAY TWITCH PLAYER
                   var src = "https://player.twitch.tv/?muted=true&channel=" + console_result;
                   console.log("Display sources with Display Names");
                   console.log(src);
                   
                   
                   var iframe = ("<li><div class='uk-panel'><iframe class='img_scroll' allowfullscreen='true' src='" + src + "'></iframe></li>");
                   //EMBED the videos
                   $("#embed-view").append(iframe);
   
               
   });

   }
   console.log("Display Name Array");
   console.log(display_name_array);        

                 
   });

});  

}

getStreamsData();

});

