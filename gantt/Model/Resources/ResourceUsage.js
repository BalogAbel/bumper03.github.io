var ResourceType_1 = require("./ResourceType");
var ResourceUsage = (function () {
    function ResourceUsage() {
    }
    ResourceUsage.prototype.deserialize = function (input) {
        this.id = input.id;
        this.resource = new ResourceType_1.ResourceType().deserialize(input.resource);
        this.need = input.need;
        return this;
    };
    return ResourceUsage;
})();
exports.ResourceUsage = ResourceUsage;
//# sourceMappingURL=ResourceUsage.js.map