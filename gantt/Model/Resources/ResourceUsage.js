///<reference path='../../../references.ts'/>
var Model;
(function (Model) {
    var Resources;
    (function (Resources) {
        var ResourceType = Model.Resources.ResourceType;
        var ResourceUsage = (function () {
            function ResourceUsage() {
            }
            ResourceUsage.prototype.deserialize = function (input) {
                this.id = input.id;
                this.resource = new ResourceType().deserialize(input.resource);
                this.need = input.need;
                return this;
            };
            return ResourceUsage;
        })();
        Resources.ResourceUsage = ResourceUsage;
    })(Resources = Model.Resources || (Model.Resources = {}));
})(Model || (Model = {}));
//# sourceMappingURL=ResourceUsage.js.map