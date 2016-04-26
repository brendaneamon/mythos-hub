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
  .controller("MythRefsIndexCtrl", [
    "MythReference",
    "$state",
    MythRefsIndexCtrl
  ])
  .controller("MythRefsShowCtrl", [
    "MythReference",
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

// Myth Reference index controller function

function MythRefsIndexCtrl (MythReference, $state) {
  var vm = this;
  vm.mythRefs = MythReference.all;
}

// Myth Reference show controller function

function MythRefsShowCtrl (MythReference, $stateParams, $state, $window) {
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
      $window.location.replace("/");
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
