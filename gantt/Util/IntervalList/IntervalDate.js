///<reference path='../../../references.ts'/>
var Util;
(function (Util) {
    var IntervalList;
    (function (IntervalList) {
        var IntervalBoundariesError = Util.IntervalList.IntervalBoundariesError;
        var IntervalDate = (function () {
            function IntervalDate(from, to) {
                this.from = new Date(from.getTime());
                this.to = new Date(to.getTime());
                if (this.from.getTime() > this.to.getTime())
                    throw new IntervalBoundariesError();
            }
            IntervalDate.prototype.compare = function (t) {
                if (!(t instanceof IntervalDate))
                    throw TypeError();
                var other = t;
                return this.from.getTime() - other.from.getTime();
            };
            IntervalDate.prototype.doOverLapWith = function (t) {
                if (!(t instanceof IntervalDate))
                    throw TypeError();
                var other = t;
                return !(this.to.getTime() <= other.from.getTime()) || (this.from.getTime() >= other.to.getTime());
            };
            return IntervalDate;
        })();
        IntervalList.IntervalDate = IntervalDate;
    })(IntervalList = Util.IntervalList || (Util.IntervalList = {}));
})(Util || (Util = {}));
//# sourceMappingURL=IntervalDate.js.map