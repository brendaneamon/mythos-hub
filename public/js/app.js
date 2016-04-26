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
    Router
  ])
  .controller("mythRefsIndexCtrl", [
    "Show",
    "$state",
    showIndexCtrl
  ]);

  function Router ($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/welcome.html"
    })
    .state("index", {
      url: "/myth-references",
      template: "/assets/html/myth-references-index.html",
      controller: "mythRefsIndexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/myth-references/:title",
      templateUrl: "/assets/html/myth-references-show.html"
    });
  }

})();
