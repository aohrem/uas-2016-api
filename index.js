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

var ffmpeg = require('fluent-ffmpeg');
var sys = require('sys');

var proc = new ffmpeg('1.mp4')
    .withSize('120x90')
    .takeScreenshots({ count: 1, timemarks: [ '00:00:02.000', '6' ] }, __dirname, function(err) {
        console.log('screenshotse saved')
    });

/*var thumbler = require('video-thumb');

thumbler.extract('1.mp4', 'snapshot.png', '00:00:22', '200x125', function(){

    console.log('snapshot saved to snapshot.png (200x125) with a frame at 00:00:22');

});*/

app.get('/', function (req, res) {
    res.send(videos);
});

app.listen(3000);
console.log('Listening on port 3000...');