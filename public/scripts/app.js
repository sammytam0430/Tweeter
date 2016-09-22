/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){


  function createTweetElement(tweet) {
    $tweet = $("<article>").addClass("tweet");

    $tweetHeader = $("<header>").html('<img src="' + tweet.user.avatars.small + '"><h2>' + tweet.user.name + '</h2>');
    $tweetHandle = $("<span>").addClass("handle").html(tweet.user.handle).appendTo($tweetHeader);

    $tweetContent = $("<section>").addClass("text").html(tweet.content.text);

    var today = Date.now();
    var daysAgo = Math.round((today - tweet.created_at) / (1000*60*60*24));
    $tweetFooter = $("<footer>").html(daysAgo + ' days ago');
    $footerIcons = $("<span>").appendTo($tweetFooter);

    $tweet.append($tweetHeader, $tweetContent, $tweetFooter);

    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function(tweetData) {
      var $tweet = createTweetElement(tweetData);
      $('#tweet-container').append($tweet);
    });
  }

  $('.new-tweet').find('form').on('submit', function(Event) {
    Event.preventDefault();
    var content = $(this).find('textarea').val();
    switch (true) {
      case (content.length > 140):
        $(this).find('input').addClass('disabled').disable;
        $(this).find('.counter').html('Your tweet is too long!');
        break;
      case (content === ''):
        $(this).find('input').addClass('disabled').disable;
        $(this).find('.counter').addClass('red').html('Your tweet is empty!');
        break;
      default:
        $.ajax({
          url: $(this).attr('action'),
          method: $(this).attr('method'),
          data: $(this).serialize(),
          dataType: 'json',
          success: function (tweet) {
            $('#tweet-container').prepend(createTweetElement(tweet));
          }
        });
    }
  });

  (function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(tweets) {
        renderTweets(tweets);
      }
    });
  }());

});
