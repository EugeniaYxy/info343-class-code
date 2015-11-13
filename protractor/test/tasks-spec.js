/* Test script for the Tasks List app */
describe('the tasks app', function() {
    // get a reference of input that is stored in model called newTask
    var taskTitleInp = element(by.model('newTask.title'));
// select the button that based on the text is selected
    var addTaskBtn = element(by.buttonText('Add Task'));
    // pick every one of the li, so we test their links
    var tasksList = element.all(by.repeater('task in tasks'));
    // test validation msg
    var requiredMsg = $('.title-required-error');

    function addTask(title) {
        //send any old string we want as users
        taskTitleInp.sendKeys(title);
        // simulate users' to click
        addTaskBtn.click();
    }

    function addMultipleTasks(num) {
        var idx;
        for(idx = 0; idx < num; ++idx) {
            addTask('Task' + idx);
        }
    }

    // run before each one of the "it" test 
    beforeEach(function(){
        // browser = protractor object that allow us to load in brower
        browser.get('http://localhost:8000');
    });


    it('must have the proper page title', function() {
        // expect function: test the condition
        // toEqual: checker
        expect(browser.getTitle()).toEqual('My Tasks');
    });

    it('must add a task', function() {
        var title = 'Learn Protractor';
        addTask(title);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must add a task hitting enter', function(){
        var title = 'Learn Protractor';
        taskTitleInp.sendKeys(title);

        taskTitleInp.sendKeys(protractor.Key.ENTER);

        addTaskBtn.click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must clear the title after adding', function() {
        addTask('box should get cleeared');
        // Test empty strings 
        expect(taskTitleInp.getAttribute('value')).toEqual('');
    });

    it('must add multiple tasks', function() {
        var num = 20;
        addMultipleTasks(num);
        expect(tasksList.count()).toEqual(20);
    });

    it('must show required validation error', function(){
        // isPresent(): get a boolean to decide whether the msg is there for not
        expect(requiredMsg.isPresent()).toEqual(false);
        taskTitleInp.sendKeys('abc');
        taskTitleInp.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInp.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);

    });

    it('must disable add task button with blank title', function() {
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
        taskTitleInp.sendKeys('abc');
        expect(addTaskBtn.getAttribute('disabled')).toEqual(null);
        taskTitleInp.clear();
        taskTitleInp.sendKeys('     ');
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
    });

    it('must toggle done with click', function() {
        addTask('test stlyle class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute('class'))
            .toContain('completed-task');
        expect(tasksList.get(1).getAttribute('class'))
            .not.toContain('completed-task');
    });

    it('must purge completed-task', function(){
        addTask('Task 1');
        addTask('Task 2');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Task 2');
    });


});