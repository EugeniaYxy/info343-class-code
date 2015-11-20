
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // 1. Navigator: global variable
        //to Open getUserMedia method on different browsers
    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;

    // 2. querySelector: use a css selector to refer to an element
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var videoStream;

    // 3. Request and pass arguments
    // video argument, function of video stream, function of error object
    // Q6: How do you adjust size?
    navigator.getUserMedia({video: true}, function(stream){
        // Q1: what does getUserMedia do? How to open the camera?
        videoStream = stream;
        // create an URL that is bound to an input stream that is dynamically adjusted
        //Q2: what is stream?
        video.src = window.URL.createObjectURL(stream);

    }, function(err) {
        console.error(err);
    });

    // Q3: when do you know you nee evt as parameter or not?
    // 4. Snapshot: Click to take a snap shoot
    video.addEventListener('click', function() {
        if(videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            // Q4: what does draw image do?
            ctx.drawImage(video,0,0);
        }
    });

    var mouseClick = false;

    // Q5: why you use canvas here, not document
    canvas.addEventListener('mousedown', function(evt) {
        var downY = evt.clientY - canvas.offsetTop + window.scrollY;
        var downX = evt.clientX - canvas.offsetLeft;
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        ctx.moveTo(downX, downY);
        mouseClick = true;
    });


    canvas.addEventListener('mousemove', function(evt){
        var moveY = evt.clientY - canvas.offsetTop + window.scrollY;
        var moveX = evt.clientX - canvas.offsetLeft;
        if(mouseClick) {
            ctx.lineTo(moveX, moveY);
            ctx.stroke();
        }
    });


    canvas.addEventListener('mouseup', function(evt) {
        mouseClick = false;

    });

    document.querySelector('#btnSnapshot').addEventListener('click', function(){
        document.querySelector('img').src = canvas.toDataURL();
    });
});


