var ResourceType_1 = require("../../Model/Resources/ResourceType");
var ResourcesController = (function () {
    function ResourcesController($mdDialog, resources) {
        this.$mdDialog = $mdDialog;
        this.resources = resources;
        this.show = -1;
        this.newResource = new ResourceType_1.ResourceType();
        console.log(resources);
    }
    return ResourcesController;
})();
exports.ResourcesController = ResourcesController;
//# sourceMappingURL=ResourcesController.js.map