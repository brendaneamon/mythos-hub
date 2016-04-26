(function(){
  "use strict";

  angular
  .module("myth-references", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
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
  ]);

  // Myth Reference factory function is here

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
  this.mythRefs = MythReference.all;
}

// Router function

  function Router ($stateProvider) {
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
      templateUrl: "/assets/html/myth-references-show.html"
    });
  }

})();
