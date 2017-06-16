$(function() {
  const characterLimit = 140;

  $( ".text-box" ).keyup(function() {
    var contentLength = $(this).val().length;
    var remainingLength = characterLimit - contentLength;
    var $counter = $(this).parent().find('.counter');
    $counter.text(remainingLength);
    if (remainingLength < 0){
      $counter.addClass('error');
    } else {
      $counter.removeClass('error');
    }
  });
});
