/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  function createTweetElement(tweet) {
    let $tweet = $("<article>").addClass("tweet");

    let $tweetHeader = $("<header>").html('<img src="' + tweet.user.avatars.small + '"><h2>' + tweet.user.name + '</h2>');
    let $tweetHandle = $("<span>").addClass("handle").html(tweet.user.handle).appendTo($tweetHeader);

    let $tweetContent = $("<section>").addClass("text").html(tweet.content.text);

    let today = Date.now();
    let daysAgo = Math.round((today - tweet.created_at) / (1000*60*60*24));
    let $tweetFooter = $("<footer>").html(daysAgo + ' days ago');
    let $footerIcons = $("<span>").appendTo($tweetFooter);

    $tweet.append($tweetHeader, $tweetContent, $tweetFooter);

    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function(tweetData) {
      let $tweet = createTweetElement(tweetData);
      $('#tweet-container').append($tweet);
    });
  }

  $('#new-tweet').find('form').on('submit', function(e) {
    e.preventDefault();
    let content = $(this).find('textarea').val();
    if (content.length > 140) {
      $(this).find('input').addClass('disabled').disable;
      $(this).find('.counter').html('Your tweet is too long!');
    } else if (content === '') {
      $(this).find('input').addClass('disabled').disable;
      $(this).find('.counter').addClass('red').html('Your tweet is empty!');
    } else {
      $.ajax({
        url: $(this).attr('action'),
        method: $(this).attr('method'),
        data: $(this).serialize(),
        dataType: 'json',
        success: function (tweet) {
          $("#new-tweet").find('textarea').val('');
          $("#new-tweet").find(".counter").html('140');
          $('#tweet-container').prepend(createTweetElement(tweet));
        }
      });
    }
  });

  (function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
  }());

  $( "#composeButton" ).click(function(e) {
    e.preventDefault()
    $( "#new-tweet" ).slideToggle( "slow", function() {
      $('textarea').focus();
    });
  });

});
