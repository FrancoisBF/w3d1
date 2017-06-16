$(document).ready(function() {
  $('.new-tweet').hide();

  function createTweetElement(tweet) {
    function date(created_at){
      return moment(created_at).fromNow();
    }
    return `<article class="tweet-class show">
        <header>
          <img src="${tweet.user.avatars.small}">
          <h1>${tweet.user.name}</h1>
          <p>${tweet.user.handle}</p>
        </header>
        <div class="clearfix testcontent">
          <p>${tweet.content.text}</p>
        </div>
        <footer class="footer">${date(tweet.created_at)}
        <div class="footer-style">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </footer>
    </article>`
  }

  function renderTweets(tweets) {
    for(var i = 0; i < tweets.length; i++) {
      var $tweet = createTweetElement(tweets[i]);
      $('#tweet-id').prepend($tweet);
    }
  }

// show icon flag, heart, retweet when mouseover
  // $('.container').on('mouseover','.tweet-class', function(){
  //   $('.footer-style').show();
  // });
  // $('.container').on('mouseout','.tweet-class', function(){
  //   $('.footer-style').hide();
  // });


  $('.compose').on('click', function(){
    $('.new-tweet').slideToggle();
    $('.text-box').select();
  });

  $('#tweet').on('submit', function (event) {
    event.preventDefault();
    if (!$('.text-box').val()){
      alert("Please Tape something")
      return
    }
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function (tweets){
        loadTweets();
        $('.counter').text('140')
        $('.text-box').val('');
      }
    });
  });

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        renderTweets(tweets);
      }
    });
  }
  loadTweets()
});
