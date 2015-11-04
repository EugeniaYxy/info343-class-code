/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    // 1. constant(key's name, value) --> in order not to mess up, refer contacts list as storageKeys
    .constant('storageKey', 'contacts-list')
    //2. factory: how can you fetch modles and make them available at the same time
    // once once and angular holds the results later on injects it to any other places
    // format: name
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        // return an object with those properties
        return [{
            id: 'default-delete-me',
            fname: 'Fred',
            lname: 'Flinstone',
            phone: '206-555-1212',
            dob: '1/1/1900'
        }];
    })
    //3. config: Initialization
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url:'/contacts',
                //where is it displayed
                templateUrl: 'views/contacts-list.html',
                //which controller in this module do i want to activate
                controller: 'ContactsController'
            })

            .state('detail', {
                url:'/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'
            })
        
            .state('edit', {
                url:'/contacts/:id/edit',
                templateUrl:'views/edit-contact.html',
                controller: 'EditContactController'
            });
        //Other wrong situation, like someone mistakenly do something in url input, happens
        $urlRouterProvider.otherwise('/contacts');
    })
    .controller('ContactsController', function($scope, contacts) {
        //
        $scope.contacts = contacts;
    })

    .controller('ContactDetailController', function($scope, $stateParams,
                                                    $state, contacts){

    // take a function like foreEach and return a true or false value
        // in url, we use : to capture "id" as a property with the same name after :
        $scope.contact = contacts.find(function(contact) {
           return contact.id === $stateParams.id;
        });
    })

    .controller('EditContactController', function($scope, $stateParams,
                                                  $state, contacts) {
        var existingContact = contacts.find(function(contact){
            return contact.id = $stateParams.id;
        });

        // validation
        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            angular.copy($scope.contact, existingContact);
            $state.go('list');
        }
    });
    
