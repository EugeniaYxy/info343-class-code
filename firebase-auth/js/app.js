/*
1. var auth = $firebaseAuth(rootRef);
auth.$onAuth(function(){

})


Team Biuld Up
1. New Repo
- Public
- ReadMe

2. Add ppl
- Setting --> Collaborators
- Clone it

3. Create new feature branch
- git branch
- git branch -remote
(Switch to a new branch)
- git checkout -b gitignore

3. Add & Commit
- git push origin gitignore
- (Me) Compare and Pull requests / assigned to the rest of the group
- (Others group): Merge and confirm merge

4. (Other group member)Add & Commit
- git checkout master
- git pull origin master
- git checkout (their branch)
- git merge master
- gitk (check all the processes)

5. Delete old version'
- git branch (freature2)
- git branch -d (freature2)

6. How to revert the changes you made after you already done the commit
- git revert HEAD

7.

 */



angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chatauth.firebaseio.com/')
    .controller('ChatController', function($scope, $firebaseArray, $firebaseObject, $firebaseAuth, firebaseUrl) {
        //create reference to the Firebase
        var rootRef = new Firebase(firebaseUrl);

        //create an authentication service for this firebase
        var auth = $firebaseAuth(rootRef);

        //when the user clicks the signin button...
        $scope.signin = function() {
            //authenticate with github using a popup window
            auth.$authWithOAuthPopup('github')
                .catch(function(err) {
                    console.error(err);
                });
        };

        //when the user clicks the signout button...
        $scope.signout = function() {
            //un-authenticate (sign out)
            auth.$unauth();
        };

        //when the authentication state changes...
        auth.$onAuth(function(authData) {
            //if we have authentication data
            if (authData) {
                //get the users object
                $scope.users = $firebaseObject(rootRef.child('users'));
                //when it's finished loading...
                $scope.users.$loaded().then(function() {
                    //add this user to the users object using the github username
                    //as the key
                    $scope.users[authData.github.username] = authData.github;

                    //and save the users object
                    $scope.users.$save();
                });

                //add the github user data to the scope
                $scope.user = authData.github;

                //get the last 1000 messages and add those to the scope
                var messagesRef = rootRef.child('messages');
                messagesRef.limitToLast(1000);
                $scope.messages = $firebaseArray(messagesRef);
            }
            else {
                //not authenticated, so reset all the scope values to null
                $scope.users = null;
                $scope.user = null;
                $scope.messages = null;
            }
        }); //$onAuth()

        //when the user clicks the send message button...
        $scope.sendMessage = function() {
            //add a new object to messages
            //the .$add() method will add the object and synchronize with the server
            //don't use .push() here or it won't be synchronized
            $scope.messages.$add({
                username: $scope.user.username,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            })
                .then(function() {
                    //after the add is done, clear the body field
                    $scope.body = null;
                    //and any error
                    $scope.error = null;
                })
                .catch(function(err) {
                    console.error(err);
                    $scope.error = err;
                });
        }; //sendMessage()

    }); //ChatController
