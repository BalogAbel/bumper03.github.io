///<reference path='../../../references.ts'/>
var Model;
(function (Model) {
    var Resources;
    (function (Resources) {
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
        Resources.ResourceType = ResourceType;
    })(Resources = Model.Resources || (Model.Resources = {}));
})(Model || (Model = {}));
//# sourceMappingURL=ResourceType.js.map