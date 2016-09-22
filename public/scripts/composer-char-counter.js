$(document).ready(function(){

  const $textarea = $(".new-tweet").find("textarea");
  const $counter = $(".new-tweet").find(".counter");
  const $input = $(".new-tweet").find('#submit-button')

  $textarea.on("input", function () {
    const tweetLength = $(this).val().length
    $counter.text(140-tweetLength);
    switch (true) {
      case (tweetLength > 140):
        $counter.addClass('red');
        break;
      case (0 < tweetLength < 140):
        $input.removeClass('disabled');
        $counter.removeClass('red');
        break;
    }
  });
})
