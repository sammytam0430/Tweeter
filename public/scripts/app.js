/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  function createTweetElement(tweet) {
    let $tweet = $("<article>").addClass("tweet");

    let $tweetHeader = $("<header>").html('<img src="' + tweet.user.avatars.small + '"><h2>' + tweet.user.name + '</h2>');
    let $tweetHandle = $("<span>").addClass("handle").text(tweet.user.handle).appendTo($tweetHeader);

    let $tweetContent = $("<section>").addClass("text").text(tweet.content.text);

    let today = Date.now();
    let daysAgo = Math.round((today - tweet.created_at) / (1000*60*60*24));
    let $tweetFooter = $("<footer>").html('<p>' + calculateSince(tweet) + '</p>');
    let $footerIcons = $("<span>").addClass('react').html('<img src="/images/like.png"><img src="/images/retweet.png"><img src="/images/flag.png">').appendTo($tweetFooter);

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
    let $this = $(this);
    let $counter = $this.find('.counter');
    let $input = $this.find('input');
    let content = $this.find('textarea').val();
    if (content.length > 140) {
      $counter.text('Your tweet is too long!');
      $input.addClass('red');
    } else if (content === '' || content.match(/^\s+$/)) {
      $counter.addClass('red').text('Your tweet is empty!');
      $input.addClass('red');
    } else {
      $.ajax({
        url: $this.attr('action'),
        method: $this.attr('method'),
        data: $this.serialize(),
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

  function calculateSince(tweet) {
    let tTime = new Date(tweet.created_at);
    let cTime = new Date() - 240000;
    let sinceSec = Math.round((cTime - tTime) / 1000);
    let sinceMin = Math.round(sinceSec / 60);
    let sinceHr = Math.round(sinceMin / 60);
    let sinceDay = Math.round(sinceHr / 24);
    let since;
    if (sinceSec < 60) {
      since = 'less than a minute ago';
    } else if (sinceMin < 45) {
      since = sinceMin+' minutes ago';
    } else if(sinceMin < 60) {
      since = 'about 1 hour ago';
    } else if(sinceHr < 24) {
      since = 'about ' + sinceHr + ' hours ago';
    } else if(sinceDay < 1) {
      since = '1 day ago';
    } else {
    since = sinceDay + ' days ago';
    }
    return since;
  };

});
