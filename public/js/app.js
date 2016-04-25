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
  ]);

  function Router ($stateProvider) {
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/welcome.html"
    });
  }

})();
