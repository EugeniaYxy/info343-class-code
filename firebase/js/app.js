
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        //TODO: implement our chat controller
        // create reference to the Firebase
        var ref = new Firebase(firebaseUrl);
        // only want to get the last 1000 msg
        ref.limitToLast(1000);
        // push changes to server when local data changes and syncranized to the users when server changes
        $scope.messages = $firebaseArray(ref);
        // initialize fields
        $scope.name = null;
        $scope.body = null;

        $scope.sendMessage = function() {
            // special method: add
            // = add a new object to the array and synchronizes with the server
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            });

            $scope.body = null;
        }; // sendMessage()
    });
