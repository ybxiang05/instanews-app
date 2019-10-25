$(function() {
    $('.dropdown-button').on('change', function(){
        const selectionValue = this.value.toLowerCase();
        // $('header').append('<img src="loader.gif" />')
        $.ajax({
            method: 'GET',
            url: `https://api.nytimes.com/svc/topstories/v2/${selectionValue}.json?api-key=ALcL70xVAiEjjiKsqBxMnAX2VdWNKIIK&limit=12`,
            dataType: 'json',
        }) 
        // use empty array newsItems = []; if <=12, push to array, and append to .news-span
        .done(function(data) {
            // console.log(data);
            $('.news-span').empty();
            $.each(data.results, function (key, value) {
                // const newsItems = [];
                if (value.multimedia.length !==0 /**newsItems.length < 13**/) {
                    const str=`<div class='bg-img' style='background-image: url(${value.multimedia[4].url})'>
                        <h3 class='article-title article-text'>${value.title}</h3>
                        <p class='article-abstract article-text'>${value.abstract}</p>
                    </div>`
                    // newsItems.push(str);
                    // console.log(newsItems);
                    $('.news-span').append(str)
                    
                    // $('.news-span').append(`<p class="bg-img" style="background-image: url(${value.multimedia[4].url})">`)
                    // $(`.bg-img`).append(`<p>${this.title}</p>`)
                }

                    // for each create new <div> for just background image; append value.title to background to create that second box??


            }) 
            //  $( 'header img' ).remove()
        })
    });
    $('.bg-img').on('hover', function visibility(){
        $('.article-abstract').classList.toggle('show')
    })

});