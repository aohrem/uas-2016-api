var express = require('express');
var app = express();


var walk = require('walk');
var files = [];


// Walker options
var walker = walk.walk('../video', {
    followLinks: false
});

walker.on('file', function (root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});
var videos = {
    video_list: []
};
walker.on('end', function () {
    console.log(files);


    for (i = 0; i < files.length; i++) {
        if (files[i].endsWith(".mp4")) {
            videos.video_list.push({
                "videoName": files[i].slice(9),
                "videoUrl": files[i],
                "kmlUrl": files[i].slice(0, -3) + 'kml'
            })
        }

    }
    //   console.log(videos);
});

app.get('/', function (req, res) {
    res.send(videos);
});

app.listen(3000);
console.log('Listening on port 3000...');