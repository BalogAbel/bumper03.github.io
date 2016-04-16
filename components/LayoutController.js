"use strict";
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
}());
exports.LayoutController = LayoutController;
//# sourceMappingURL=LayoutController.js.map