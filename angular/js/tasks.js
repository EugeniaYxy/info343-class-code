/* 
    script for the tasks.html file 
*/

/*
1. ng attributes
2. scope object + functions
3. save() + local storage
4. movies.html
- column use: table - head(row, heading) / body
- use of filter: |currency & |data
*/





angular.module('Tasks', [])
    // take 2 parameter: name of the constant = any controller can get access of its value by calling its name
    // magic key: use conatant to assign the value to a name
    .constant('tasksKey', 'tasks')


    // 1. Dependency injection: angular will pass righ
    .controller('TasksController', function($scope, tasksKey) {
        'use strict';
        // initialize tasks property on the scope to an empty array
        // if nothing is in local storage (undefined), then i  want to default it
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey))|| [];
        // initialize newTask to an empty object
        $scope.newTask = {}; // empty object

        function saveTasks() {
            // encode a rich data structure
            localStorage.setItem('tasks', angular.toJson($scope.tasks));
        }

        // create a new method: assign a property of object to function
        // add a function to add newTask to the array
        $scope.addTask = function() {
            // push the current value of newTask into the tasks array
            $scope.tasks.push($scope.newTask);

            // save tasks
            saveTasks();

            // reset newTask to an empty object
            $scope.newTask = {};
        }
        //
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };
    });
