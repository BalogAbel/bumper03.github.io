"use strict";
var Task_1 = require("./Task");
var Duration_1 = require("./WorkingCalendar/Duration");
var Dependency = (function () {
    function Dependency() {
        this.lag = new Duration_1.Duration();
    }
    Dependency.prototype.hash = function () {
        return this.id;
    };
    Dependency.prototype.deserialize = function (input) {
        if (!input.hasOwnProperty('id'))
            return input;
        this.id = input.id;
        this.task = Task_1.Task.deserializeHelper(input.task);
        this.lag = new Duration_1.Duration().deserialize(input.lag);
        return this;
    };
    Dependency.prototype.getNew = function () {
        return new Dependency();
    };
    return Dependency;
}());
exports.Dependency = Dependency;
//# sourceMappingURL=Dependency.js.map