let reddit = require('redwrap');


module.exports.getPostsBySubreddit=function(sub,callback)
{
    reddit.r('nsfw', function(err, data, res){
        data.data.children.forEach(function(record){
            console.log(record.data.title)
        });
    });
}
