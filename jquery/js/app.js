/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/

/*
1. when the DOM content has been loaded...
2. $ stands for using jQuery
3. String '' stands for whatwe use in css file */

$(function(){
    'use strict';
    // 4. attr(name of attribute, value)
    $('a').attr('target', '_blank');
    // 5. Method chaining; every function will return the object that the function is called on
    // hide & fade in the page
    $('article').hide().fadeIn(1000);
    // 6. select botton to click by calling id '#' + method .click()
    // toggle() = immediate hide/show
    // fadeToggle() = fade in hide/show
    // .text() = show texts after you click
    $('#toggle-article').click(function() {
       $('article').fadeToggle();
    });

    // 7. JSON = result(a promise) return from URL
    // promise = object that returns an even
    // .then() = call back function: receive data as its one and only input argument

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f'
    $.getJSON(url).then(function(data){
            console.log(data);
           // 8. Temperature
            var temperature = data.main.temp;
            $('#temp').text(Math.round(temperature));
        });

        console.log('test');

});