///<reference path='../../../references.ts'/>
var Util;
(function (Util) {
    var HashSet = (function () {
        function HashSet() {
            this._length = 0;
            this.set = [];
        }
        HashSet.prototype.put = function (t) {
            if (!this.contains(t))
                this._length++;
            this.set[t.hash()] = t;
        };
        HashSet.prototype.putAll = function (hashSet) {
            var that = this;
            hashSet.each(function (t) {
                that.put(t);
                return true;
            });
        };
        HashSet.prototype.clear = function () {
            this._length = 0;
            this.set = [];
        };
        HashSet.prototype.remove = function (t) {
            delete this.set[t.hash()];
            this._length--;
        };
        HashSet.prototype.contains = function (t) {
            return t.hash() in this.set;
        };
        HashSet.prototype.containsAll = function (hashSet) {
            var that = this;
            var result = true;
            hashSet.each(function (t) {
                result = that.contains(t);
                return result;
            });
            return result;
        };
        HashSet.prototype.each = function (callback) {
            for (var prop in this.set) {
                if (!callback(this.set[prop]))
                    break;
            }
        };
        HashSet.prototype.length = function () {
            return this._length;
        };
        HashSet.prototype.toArray = function () {
            return this.set;
        };
        return HashSet;
    })();
    Util.HashSet = HashSet;
})(Util || (Util = {}));
//# sourceMappingURL=HashSet.js.map