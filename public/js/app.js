(function(){
  "use strict";

  angular
  .module("myth-references", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])
  .factory("MythReference", [
    "$resource",
    MythReference
  ])
  .factory("User", [
    "$resource",
    User
  ])
  .controller("MythRefsIndexCtrl", [
    "MythReference",
    "User",
    "$state",
    MythRefsIndexCtrl
  ])
  .controller("MythRefsShowCtrl", [
    "MythReference",
    "User",
    "$stateParams",
    "$state",
    "$window",
    MythRefsShowCtrl
  ]);

  // Myth Reference factory function

  function MythReference ($resource) {
    var MythRef = $resource("/api/myth-references/:title", {}, {
      update: {method: "PUT"}
    });
    MythRef.all = MythRef.query();
    MythRef.find = function(property, value, callback){
      MythRef.all.$promise.then(function(){
        MythRef.all.forEach(function(reference){
          if(reference[property] == value) callback(reference);
        });
      });
    };
    return MythRef;
  }

  // User factory function

  function User($resource){
    var User = $resource("/api/users/:name", {}, {
      update: {method: "PUT"},
    });
    User.all = User.query();
    User.find = function(property1, property2, value1, value2, callback){
      User.all.$promise.then(function(){
        User.all.forEach(function(user){
          if((user[property1] == value1) && (user[property2] == value2)) callback(user);
        });
      });
    };
    return User;
  }

  // Myth Reference index controller function

  function MythRefsIndexCtrl (MythReference, User, $state) {
    var vm = this;
    User.find("isAdmin", "isCurrentUser", true, true, function(user){
      vm.admin = user;
      console.dir(vm.admin);
    });
    vm.references = MythReference.all;
    vm.create = function(){
      MythReference.save({reference: vm.reference}, function(response){
        var reference = new MythReference(response);
        MythReference.all.push(reference);
        $state.go("show", {title: reference.title});
      });
    };
  }

  // Myth Reference show controller function

  function MythRefsShowCtrl (MythReference, User, $stateParams, $state, $window) {
    var vm = this;
    MythReference.find("title", $stateParams.title, function(reference){
      vm.reference = reference;
    });
    vm.update = function(){
      MythReference.update($stateParams, {reference: vm.reference}, function(){
        $state.go("index");
      });
    };
    vm.delete = function(){
      MythReference.remove({title: vm.reference.title}, function(){
        $window.location.replace("/myth-references");
      });
    };
  }

  // Router function

  function Router ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/welcome.html"
    })
    .state("index", {
      url: "/myth-references",
      templateUrl: "/assets/html/myth-references-index.html",
      controller: "MythRefsIndexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/myth-references/:title",
      templateUrl: "/assets/html/myth-references-show.html",
      controller: "MythRefsShowCtrl",
      controllerAs: "showVM"
    });
    $urlRouterProvider.otherwise("/");
  }

})();
