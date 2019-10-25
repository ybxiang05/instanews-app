//get value from selector
//take and make lowercase
//console log data
//make sure all articles have images
//we only want 12 articles
// go through each object and get info for each article
//append to dom

$(function() {
    $('.dropdown-button').on('change', function(){
        const selectionValue = this.value.toLowerCase();
        // $('header').append('<img src="loader.gif" />')
        $.ajax({
            method: 'GET',
            url: `https://api.nytimes.com/svc/topstories/v2/${selectionValue}.json?api-key=ALcL70xVAiEjjiKsqBxMnAX2VdWNKIIK&limit=12`,
            dataType: 'json',
        }) 
        .done(function(data) {
            $('.news-span').empty();
            const filteredImages = data.results.filter(function(event){
                if (event.multimedia[4] !==undefined) {
                    return true
                }else{
                    return false;}});
            const slicedArticles = filteredImages.slice(0, 12);
            console.log(slicedArticles);
            $.each(slicedArticles, function (key, value) {
                const str = `<a class='article-url' href='${value.url}'>
                                <div class='bg-img' style='background-image: url(${value.multimedia[4].url})'>
                                    <h3 class='article-title article-text'>${value.title}</h3>
                                    <p class='article-abstract article-text'>${value.abstract}</p>
                                </div>
                            </a>`
                $('.news-span').append(str)
            }); 
            //  $( 'header img' ).remove()
        })
    });
    $('.bg-img').on('hover', function visibility(){
        $('.article-abstract').classList.toggle('show')
    })

});