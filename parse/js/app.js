/*
    script for the index.html file
*/

<<<<<<< HEAD
//
Parse.initialize("Y0vfUaDWISBHAfJpx0aBsL3mCgnALYMyQMFDUQW2", "oEVU0q7HbmSjiMc2KQ5RX4DEeoHL5OjQm2eZnHk0")

$(function() {
    'use strict';


/* Question
    a. html
    b.underlines = ?

*/


    // 1. Create a new variable that is a class, and pass a String that is the name of the class
    var Task = Parse.Object.extend('Task');
    // 2. Query can get multiple objects at the same time
    // .Query is a function that create Object at a time
    var tasksQuery = new Parse.Query(Task);
    // 3.id + createdAt + last modified value --> new query that will retrun all tasks ordered by createAt
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);
    // 4. Reference to the task list element
    var tasksList = $('#tasks-list');

    // Reference to the error message alert
    var errorMessage =$('#error-message');

    // current set of tasks
    var tasks = [];

    //

    // 5.
=======

//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

<<<<<<< HEAD
    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner());
    }

    function onData(result) {
        tasks = result;
        renderTasks();
    }

    function renderTasks () {
        tasksList.empty();
        tasks.forEach(function(task){
            var li =  $(document.createElement('li'))
                .text(task.get('title')) // set it to text
                // one line to conditionally add a class is done
                .addClass(task.get('done')? 'completed-task': '')
                .appendTo(tasksList) // append the text
                .click(function() {
                    // use done property as a result of !task.get('done')
                    // condition: done; evaluate
                    task.set('done', !task.get('done'));
                    // re-render them to change the style class based on whether the task is done or not
                    task.save().then(renderTasks, displayError);
                });
            // create an element called span
            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating') || 0),
                    hints: ['crap', 'awful', 'ok', 'nice', 'aswesome']})
                .appendTo(li);
        });
    }

    // if message is not defined, we'll defalt it to hello
    function showMessage(message) {
        message = message || 'Hello';
        alert(message);
    }

    //showMessage('World')

    //7. when the user submits the new task form
    // catch the submit event
    $('#new-task-form').submit(function(evt) {
        // doing both to work in both browsers, cuz we don't want to browsers to handle the information.
        evt.preventDefault();
        // attribute syntaxt?
        var titleInput = $(this).find('[name="title"]');
        // .val() is a function
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.set('rating', $('#rating').raty('score'));
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
            titleInput.val('');
                $('#rating').raty('set', {});
        });
        return false;
    });


    // go and fetch tasks from Parse
    fetchTasks();
    // enable the rating user interface element
    $('#rating').raty({rating: true});

    //refetch the tasks every so often to get new tasks created by others
    window.setInterval(fetchTasks,10000);

    /* 6. concept about html
          a. type: searcg / text/ num / email
          b. name
          c. placeholder: tells the users what categories users can type
          d. autofocus: input focus to go directly to input control
          e. button
            1) type = reset: clear
            2) tpe = submit: it will post the server by submitting the form for you if you click the button

    */

    // 8. global variable: ask browser every 3 second to call the fetch tasks in server
    // window.setInterval(fetchTasks, 3000);

    // 9. acynchronous feedback


});
=======
    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
