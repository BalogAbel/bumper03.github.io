///<reference path='IInterval.ts'/>
///<reference path='IntervalOverlapError.ts'/>
var Util;
(function (Util) {
    var IntervalOverlapError = Util.IntervalOverlapError;
    var IntervalList = (function () {
        function IntervalList() {
            this.intervals = [];
        }
        IntervalList.prototype.push = function (t) {
            this.intervals.forEach(function (element) {
                if (element.doOverLapWith(t))
                    throw new IntervalOverlapError();
            });

            var i;
            for (i = 0; i < this.intervals.length; i++) {
                if (this.intervals[i].compare(t) > 0)
                    break;
            }
            this.intervals.splice(i, 0, t);
        };

        IntervalList.prototype.removeLast = function (t) {
            var index = this.intervals.lastIndexOf(t);
            this.remove(index);
        };

        IntervalList.prototype.remove = function (index) {
            this.intervals.splice(index, 1);
        };

        IntervalList.prototype.last = function () {
            return this.intervals[this.intervals.length - 1];
        };

        IntervalList.prototype.each = function (callback) {
            for (var prop in this.intervals) {
                if (!callback(this.intervals[prop]))
                    break;
            }
        };
        return IntervalList;
    })();
    Util.IntervalList = IntervalList;
})(Util || (Util = {}));
//# sourceMappingURL=IntervalList.js.map
