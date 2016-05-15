"use strict";
var ResourceType_1 = require("../../Model/Resources/ResourceType");
var ResourcesController = (function () {
    function ResourcesController($mdDialog, resources) {
        this.$mdDialog = $mdDialog;
        this.resources = resources;
        this.newResource = new ResourceType_1.ResourceType();
    }
    ResourcesController.prototype.close = function () {
        this.$mdDialog.hide();
    };
    ResourcesController.prototype.removeResource = function (resource) {
        var idx = this.resources.indexOf(resource);
        if (idx == -1)
            return;
        this.resources.splice(idx, 1);
    };
    ResourcesController.prototype.addResource = function () {
        this.resources.push(this.newResource);
        this.newResource = new ResourceType_1.ResourceType();
    };
    return ResourcesController;
}());
exports.ResourcesController = ResourcesController;
//# sourceMappingURL=ResourcesController.js.map