/**
 * Created by Balog �bel P�ter on 2015.04.08..
 */
///<reference path='../references.ts' />
var app;
(function (app) {
    var LayoutController = (function () {
        function LayoutController($mdBottomSheet, $q, $mdSidenav) {
            this.$mdBottomSheet = $mdBottomSheet;
            this.$q = $q;
            this.$mdSidenav = $mdSidenav;
        }
        LayoutController.prototype.toggleList = function () {
            this.$mdSidenav('left').toggle();
        };
        return LayoutController;
    })();
    app.LayoutController = LayoutController;
})(app || (app = {}));
//# sourceMappingURL=LayoutController.js.map