$(document).ready(function(){


  $('#tweet-container').on('mouseenter', '.tweet', function (event) {
    let $this = $(this);
    $this.children('header').addClass('hover');
    $this.children('footer').find('span').html('<img src="/images/like.png"><img src="/images/retweet.png"><img src="/images/flag.png">');
  });

  $('#tweet-container').on('mouseleave', '.tweet', function (event) {
    let $this = $(this);
    $this.children('header').removeClass('hover');
    $this.children('footer').find('span').html('');
  });

  $('#nav-bar').on('mouseenter', '#composeButton', function (event) {
    let $this = $(this);
    $this.removeClass('color').addClass('colorHover');
  });

  $('#nav-bar').on('mouseleave', '#composeButton', function (event) {
    let $this = $(this);
    $this.addClass('color').removeClass('colorHover');
  });
})
