'use strict';

angular.
module('myApp').
component('clientList',{
    templateUrl: 'client-list/client-list.template.html',
    controller: function PackageListController($http, $firebaseArray){
        console.log('component called...');
        var self = this;

        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBv3KT150U004xDAQNz2voPX9Qixk9l5FE",
            authDomain: "packagelist-d6020.firebaseapp.com",
            databaseURL: "https://packagelist-d6020.firebaseio.com",
            projectId: "packagelist-d6020",
            storageBucket: "packagelist-d6020.appspot.com",
            messagingSenderId: "445391622853",
            appId: "1:445391622853:web:a6d56eccf7b314ecfc16ac"
        };

        // Initialize Firebase connection
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        //get connection root object
        const rootRef = firebase.database().ref();

        //bind clients to database
        self.clients = $firebaseArray(rootRef);

        //delete client from database
        self.deleteClient = function (client) {
            console.log("Deleting client...");
            self.clients.$remove(client);
        };
    }

});