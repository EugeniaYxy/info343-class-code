/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    askPermission();

    function askPermission() {
        Notification.requestPermission(function(result) {
            if('granted' === result) {
                console.log('Uh oh, we will never get permission');
                showNotification('Thanks!', 'You will now see my notifications');
            }
        });
    }


    function showNotification(title, body) {
        var note = new Notification(title, {
            body: body,
            icon: 'img/notification.png'
        });
        // provides
        window.setTimeout(note.close.bind(note), 3000);
    }

    var triggerBtn = document.getElementById('trigger');
    triggerBtn.addEventListener('click', function() {
        switch (Notification.permission) {
            case 'granted':
                showNotification('Hello', 'trigger at ' + new Date().toLocaleTimeString());
                // if match, then we run everything under 'granted'
                break;

            case 'denied':
                alert('Please enable notifictaions!');
                break;

            default:
                askPermission();
        }
    })

});
