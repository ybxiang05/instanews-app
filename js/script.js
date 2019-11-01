$("select").selectric();

$(function() {
  $(".dropdown-button").on("change", function() {
    $(".header").append(
      '<img class="loader-gif" src="assets/images/ajax-loader.gif" />'
    );

    const selectionValue = $(this).val();

    console.log(selectionValue);
    if (selectionValue !== "sections") {
      loadAjax(selectionValue);
    } else {
      $("header .loader-gif").remove();
    }
  }); // end of on change event

  function loadAjax(selectionValue) {
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
        $.each(slicedArticles, function(key, value) {
          const str = `<a class='bg-img' style='background-image: url(${value.multimedia[4].url})' role ='img' aria-label='${value.multimedia[4].caption} ${value.title} ${value.abstract}' href ='${value.url}' target='_blank'>
        <div class='article-text'>
          <h1 class='article-title' role='heading' aria-label='${value.title}' >${value.title}</h1>
          <p class='article-abstract'>${value.abstract}</p>
        </div>
      </a>`;
          $(".news-span").append(str);
        });
      })
      .fail(function() {
        $(".news-span").append(
          "It appears late-stage capitalism broke the internet again. Please refresh the page, or try again later."
        );
        console.log("something went wrong");
      })
      .always(function() {
        $("header .loader-gif").remove();
      }); // end of .ajax
  }
}); // end of doc ready
