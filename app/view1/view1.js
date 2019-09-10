var myApp = angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

myApp.controller('View1Ctrl', function View1Ctrl ($scope, $firebaseArray) {
    console.log('View1 Controller loaded...');

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
    $scope.clients = $firebaseArray(rootRef);

    //service package
    let serviceObj = {
        dataLevel : 0,
        networkLevel : 0,
        virusLevel : 0,
        appLevel : 0
    };

    $scope.dataLabel ='';
    $scope.netLabel ='';
    $scope.virusLabel ='';
    $scope.appLabel ='';


    //add client to database
    $scope.addClient = function () {
        console.log("Adding client...");

        $scope.clients.$add(
            {
                fName: $scope.fName,
                lName: $scope.lName,
                company: $scope.company,
                email: $scope.email,
                telephone: $scope.telephone,
                service : serviceObj
            }
            ).then(function (rootRef) {
                var ref = rootRef.ref;
                console.log("Added client with ref: " + ref);

                $scope.fName = '';
                $scope.lName = '';
                $scope.company = '';
                $scope.email = '';
                $scope.telephone = '';

                serviceObj = {
                    dataLevel : 0,
                    networkLevel : 0,
                    virusLevel : 0,
                    appLevel : 0
                };
            })
        };

    //delete client from database
    $scope.deleteClient = function (item) {
        console.log("Deleting client...");
        $scope.clients.$remove(item);
    };


    //button setters
    $scope.setDataLevel = function (value) {
        serviceObj.dataLevel = value / 12 * 100;

    };

    $scope.setNetworkLevel = function (value) {
        serviceObj.networkLevel = value / 12 * 100;
    };

    $scope.setVirusLevel = function (value) {
        serviceObj.virusLevel = value / 12 * 100;

    };

    $scope.setAppLevel = function (value) {
        serviceObj.appLevel = value / 12 * 100;

    };

    //progress bar
    $scope.protectionLevel = function () {
       var total =  serviceObj.dataLevel + serviceObj.networkLevel + serviceObj.virusLevel + serviceObj.appLevel;
       return "width:"+total+"%";
    };

    //label setters
    $scope.setDataLabel = function (value) {
        $scope.dataLabel = value;
        console.log('set label..');
    };

    $scope.setNetworkLabel = function (value) {
        $scope.netLabel = value;
        console.log('set label..');

    };

    $scope.setVirusLabel = function (value) {
        $scope.virusLabel = value;

    };

    $scope.setAppLabel = function (value) {
        $scope.appLabel = value;
    };

});



