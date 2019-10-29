//
//put in loader.gif
//get value from selector
//take and make lowercase
//***** if statement for if selections is chosen, if so, do not run ajax
//make sure all articles have images
//we only want 12 articles
// go through each object and get info for each article
//append to dom
//***** - deferred .always remove loader.gif
//***** add .fail(function)

$(function() {
  $(".dropdown-button").on("change", function() {
    $(".header").append(
      '<img class="loader-gif" src="assets/images/ajax-loader.gif" />'
    );

    const selectionValue = this.value.toLowerCase();

    // TODO check if selected val is "sections" and dont run ajax if it is
    // return;
    if (selectionValue !== "sections") {
      $.ajax({
        method: "GET",
        url: `https://api.nytimes.com/svc/topstories/v2/${selectionValue}.json?api-key=ALcL70xVAiEjjiKsqBxMnAX2VdWNKIIK&limit=12`,
        dataType: "json"
      })
        .done(function(data) {
          $(".nyt-logo").addClass("change");
          $(".category-selection").addClass("change");
          $(".news-span").empty();
          const filteredImages = data.results.filter(function(event) {
            if (event.multimedia[4] !== undefined) {
              return true;
            }
          });
          const slicedArticles = filteredImages.slice(0, 12);
          console.log(slicedArticles);
          $("header .loader-gif").remove();
          $.each(slicedArticles, function(key, value) {
            const str = `<a class='bg-img' style='background-image: url(${value.multimedia[4].url})' href ='${value.url}'>
          <div class='article-text'>
            <h3 class='article-title'>${value.title}</h3>
            <p class='article-abstract'>${value.abstract}</p>
          </div>
        </a>`;
            $(".news-span").append(str);
          });
        })
        .fail(function() {
          console.log("something went wrong");
        });
    } else {
      $(".news-span").empty();
      console.log("selections");
    }
  });
});
