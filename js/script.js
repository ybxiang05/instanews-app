//get value from selector
//take and make lowercase
//console log data
//make sure all articles have images
//we only want 12 articles
// go through each object and get info for each article
//append to dom

$(function() {
  $(".dropdown-button").on("change", function() {
    $(".nyt-logo").addClass("change");
    $(".category-selection").addClass("change");
    const selectionValue = this.value.toLowerCase();
    //on change, make logo small??
    // if ($(window).width() > 600) {
    //   $(".nyt-logo").css("width", "75px");
    // } else {
    //   $(".nyt-logo").css("width", "150px");
    // }

    // $('header').append('<img src="loader.gif" />')
    $.ajax({
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${selectionValue}.json?api-key=ALcL70xVAiEjjiKsqBxMnAX2VdWNKIIK&limit=12`,
      dataType: "json"
    }).done(function(data) {
      $(".news-span").empty();
      const filteredImages = data.results.filter(function(event) {
        if (event.multimedia[4] !== undefined) {
          return true;
        } //else {
        //   return false;
        // }
      });
      const slicedArticles = filteredImages.slice(0, 12);
      console.log(slicedArticles);
      $.each(slicedArticles, function(key, value) {
        const str = `<a class='bg-img' style='background-image: url(${value.multimedia[4].url})' href ='${value.url}'>
            <h3 class='article-title article-text'>${value.title}</h3>
            <p class='article-abstract article-text'>${value.abstract}</p>
        </a>`;
        $(".news-span").append(str);
      });
    });
    //  $( 'header img' ).remove()
  });
});
$(".bg-img").on("hover", function visibility() {
  $(".article-abstract").classList.toggle("show");
});
// });
