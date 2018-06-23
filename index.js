const youtube_thumbnail_search= 'https://www.googleapis.com/youtube/v3/search'

function dataFromApi(searchResult, callback){
  const query= {
    q: `${searchResult}`,
    part: "snippet",
    key: "AIzaSyBx_9hcaao0i9ehCRYe1h0IX0vIwDv7PGQ"
    
  }
  
  $.getJSON(youtube_thumbnail_search, query, callback);
}

function renderResult(result){
  return`
  <h2>${result.snippet.title}</h2>
  <a href= "https://www.youtube.com/watch?v=${result.id.videoId}" aria-label="${result.snippet.title}"><img src="${result.snippet.thumbnails.medium.url}" aria-label="${result.snippet.description}"></a>
  <p> Check out more from the channel:<a href= "https://www.youtube.com/channel/${result.snippet.channelId}" aria-label="Check out more from the ${result.snippet.channelTitle}"> click here</a></p>
  `
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item) => renderResult(item));
  $('.js-search-results').html(results);
}

funtion totalReveal(){
  $('.js-total').prop('hidden', false);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(query);
    // clear out the input
    queryTarget.val("");
    dataFromApi(query, displayYoutubeSearchData);
    totalReveal();
  });
}

$(watchSubmit);

