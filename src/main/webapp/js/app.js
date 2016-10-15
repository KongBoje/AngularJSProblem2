var myApp = angular.module('DemoApp', ["ngRoute"]);

myApp.factory('CarFactory', function() {
    
    var cars = [{
        id: 1,
        year: 1997,
        registered: new Date(1999, 3, 15),
        make: 'Ford',
        model: 'E350',
        description: 'ac, abs, moon',
        price: 3000
    }, {
        id: 2,
        year: 1999,
        registered: new Date(1996, 3, 12),
        make: 'Chevy',
        model: 'Venture',
        description: 'None',
        price: 4900
    }, {
        id: 3,
        year: 2000,
        registered: new Date(199, 12, 22),
        make: 'Chevy',
        model: 'Venture',
        description: '',
        price: 5000
    }, {
        id: 4,
        year: 1996,
        registered: new Date(2002, 3, 15),
        make: 'Jeep',
        model: 'Grand Cherokee',
        description: 'Moon roof',
        price: 4799
    }];

    var nextId = 5;
    var getCars = function() {
        return cars;
    };
    var deleteCar = function(id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    };
    var addEditCar = function(newcar) {
        alert("adding a car");
        
        if (newcar.id == null) {
            newcar.id = nextId++;
            cars.push(newcar);
        } else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                }
            }
        }
    };
    
    return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar
    };
    
    
});

myApp.controller("FrontPageController", ["$scope", function($scope) {
        this.title = "Front page";
}]);

myApp.controller("ViewController", ["$scope", "CarFactory", function($scope, CarFactory) {
        $scope.cars = CarFactory.getCars();
        $scope.deleteCar = function(data) {
            CarFactory.deleteCar(data);
        };
        //$scope.ctrl.cars = CarFactory.getCars();
}]);

myApp.controller('CarController', ['$scope', "CarFactory", "$routeParams", function ($scope, CarFactory, $routeParams) {
        if($routeParams.id == undefined) {
            alert("Hey");
            $scope.newcar = null;
            //alert("Let's make a new car");
        } else {
            var tmp = CarFactory.getCars();
            for(var i = 0; i < tmp.length; i++) {
                if(tmp[i].id == $routeParams.id) {
                    $scope.newcar = tmp[i];
                    $scope.newcar.id = tmp[i].id;
                    //alert(tmp[i].make);
                }
            }
        }
}]);

myApp.controller('CarControllerEmpty', ['$scope', "CarFactory",function ($scope, CarFactory) {
        $scope.newcar = null;
        $scope.addEditCar = function(data) {
            CarFactory.addEditCar(data);
        };
}]);

myApp.config(function($routeProvider) {
    $routeProvider.when("/list", {
        controller: "ViewController",
        templateUrl: "list.html"
    });
    $routeProvider.when("/form", {
        templateUrl: "form.html",
        controller: "CarControllerEmpty"
    });
    $routeProvider.when("/form/:id", {
        templateUrl: "form.html",
        controller: "CarController"
    });
});