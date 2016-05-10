"use strict";
var HashSet = (function () {
    function HashSet() {
        this._length = 0;
        this.set = {};
    }
    HashSet.prototype.put = function (t) {
        if (!this.contains(t))
            this._length++;
        this.set['hash.' + t.hash()] = t;
    };
    HashSet.prototype.putAll = function (hashSet) {
        var that = this;
        hashSet.each(function (t) {
            that.put(t);
            return true;
        });
    };
    HashSet.prototype.get = function (hash) {
        return this.set["hash." + hash];
    };
    HashSet.prototype.clear = function () {
        this._length = 0;
        this.set = [];
    };
    HashSet.prototype.remove = function (t) {
        delete this.set['hash.' + t.hash()];
        this._length--;
    };
    HashSet.prototype.removeByHash = function (hash) {
        delete this.set['hash.' + hash];
        this._length--;
    };
    HashSet.prototype.contains = function (t) {
        return ('hash.' + t.hash()) in this.set;
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
        var result = [];
        this.each(function (t) {
            result.push(t);
            return true;
        });
        return result;
    };
    HashSet.prototype.deserialize = function (input, inst) {
        this.set = {};
        this._length = input._length;
        for (var prop in input.set) {
            var item = inst.getNew().deserialize(input.set[prop]);
            this.set["hash." + item.hash()] = item;
        }
        return this;
    };
    return HashSet;
}());
exports.HashSet = HashSet;
//# sourceMappingURL=HashSet.js.map