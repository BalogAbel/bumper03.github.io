var ResourceType = (function () {
    function ResourceType() {
    }
    ResourceType.prototype.deserialize = function (input) {
        if (!input.hasOwnProperty('available'))
            return input;
        this.id = input.id;
        this.available = input.available;
        this.name = input.name;
        return this;
    };
    return ResourceType;
})();
exports.ResourceType = ResourceType;
//# sourceMappingURL=ResourceType.js.map