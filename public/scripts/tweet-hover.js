$(document).ready(function(){


  $('#tweetContainer').on('mouseenter', '.tweet', function (event) {
    let $this = $(this);
    $this.children('header').addClass('hover');
    $this.children('footer').find('span').addClass('widget');
  });

  $('#tweetContainer').on('mouseleave', '.tweet', function (event) {
    let $this = $(this);
    $this.children('header').removeClass('hover');
    $this.children('footer').find('span').removeClass('widget');
  });
})
