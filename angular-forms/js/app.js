/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    // 1. constant(key's name, value) --> in order not to mess up, refer contacts list as storageKeys
    .constant('storageKey', 'contacts-list')
    //2. factory: how can you fetch modles and make them available at the same time
    // once once and angular holds the results later on injects it to any other places
    // format: name
    .factory('contacts', function(localStorageService, storageKey) {
        // return an object with those properties
        return localStorageService.get(storageKey) || [];
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
    // register a directive for custom validation of dates in the past
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) {
                    var today = new Data();
                    return (new Date(modelValue <= TODAY))
                }
            }
        }
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
                                                  $state, uuid, localStorageService,
                                                  storageKey, contacts) {
        var existingContact = contacts.find(function(contact){
            return contact.id = $stateParams.id;
        });

        // validation
        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            if($scope.contact.id) {
                angular.copy($scope.contact, existingContact);
            } else {
                $scope.contact.id = uuid.v4();
                contact.push($scope.contact);
            }

            localStorageService.set(storageKey, contacts);
            $state.go('list');
        }
    });
    
