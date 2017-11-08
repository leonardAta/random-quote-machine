
$(document).ready(function() {
  
  getQuote();
  
  $('#quoteButton').on('click', function() {
    $('.load').show();
    getQuote();
  });
});
//getQuote method using AJAX methodology
var getQuote = function() {
  $.ajax({
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
    dataType: 'jsonp',
    //if the request is successfully carried out
    success: function(data){
      //add quote to the quoteText element
      $('#quoteText').html(data.quoteText);
      if(data.quoteAuthor !== '') {
        $('#quoteAuthor').html(data.quoteAuthor);
      }
      else {
        // when there is no author
        $('#quoteAuthor').html('Unknown')
      }
      var tweet = $('#tweet-btn');
      tweet.prop('disabled', false);
      tweet.unbind().click(function() {
        // embeds the quote + quote author as a tweet 
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(data.quoteText + '-' + data.quoteAuthor));
      });
    },
    // error handling
    error: function(xhr, status, error) {
      $('#quoteText').text('Please try clicking again...');
      $('#quoteAuthor').text('Ata Tangban');
      $('#tweet-btn').prop('disabled', true);
    }
  });
};