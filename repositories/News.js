let newsSource = require('newsapi');
let news = new newsSource('cea4dab2ae934e6793fa54fc6f7525a5');

module.exports.getTopStories = function(callback)
{
    news.articles({
        source: 'bbc-news', // required
        sortBy: 'top' // optional
    }).then(articlesResponse => {
    console.log(articlesResponse);
    });

}