"use strict";
var Utils = (function () {
    function Utils() {
    }
    Utils.getTimeLineWidth = function () {
        return $("#timeLineWrapper").width();
    };
    Utils.getCanvasHeight = function () {
        return $("#taskWrapper").outerHeight();
    };
    Utils.dateToPosition = function (date) {
        var days = (date.getTime() - this.startDate.getTime()) / 1000 / 60 / 60 / 24;
        return days * this.dayWidth;
    };
    Utils.positionToDate = function (position) {
        var time = (position / this.dayWidth) * 24 * 60 * 60 * 1000;
        return new Date(this.startDate.getTime() + Math.round(time));
    };
    Utils.getCanvasWidth = function () {
        return Math.ceil((Utils.finishDate.getTime() - Utils.startDate.getTime()) / 1000 / 60 / 60 / 24) * Utils.dayWidth;
    };
    Utils.getZoomLevel = function () {
        if (Utils.dayWidth > 300)
            return 1;
        return 0;
    };
    Utils.taskLineHeight = 30;
    Utils.dayWidth = 100;
    Utils.startDate = new Date();
    Utils.finishDate = new Date();
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map