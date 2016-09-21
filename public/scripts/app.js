/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 var tweetData = {
   "user": {
     "name": "Newton",
     "avatars": {
       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
     },
     "handle": "@SirIsaac"
   },
   "content": {
     "text": "If I have seen further it is by standing on the shoulders of giants"
   },
   "created_at": 1461116232227
 }

function createTweetElement(tweet) {
  $(document).ready(function(){

    const $input = $(".new-tweet").find("input");
    $input.click(function (e) {
      e.preventDefault();

      $tweet = $("<article>").addClass("tweet");

      $tweetHeader = $("<header>").html('<img src="' + tweet.user.avatars.small + '"><h2>' + tweet.user.name + '</h2>');
      $tweetHandle = $("<span>").addClass("handle").html(tweet.user.handle).appendTo($tweetHeader);

      $tweetContent = $("<section>").addClass("text").html(tweet.content.text);

      var today = Date.now();
      var daysAgo = Math.round((today - tweet.created_at) / (1000*60*60*24));
      $tweetFooter = $("<footer>").html(daysAgo + ' days ago');
      $footerIcons = $("<span>").appendTo($tweetFooter);

      $('.container').append($tweet);
      $tweet.append($tweetHeader, $tweetContent, $tweetFooter);

    });
  });
}


 var $tweet = createTweetElement(tweetData);

 // Test / driver code (temporary)
 console.log($tweet); // to see what it looks like
