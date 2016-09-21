$(document).ready(function(){

  const $textarea = $(".new-tweet").find("textarea");
  const $counter = $(".new-tweet").find(".counter");

  $textarea.on("input", function () {
    const tweetLength = $(this).val().length
    $counter.text(140-tweetLength);
    if (tweetLength > 140) {
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }
  });

})
