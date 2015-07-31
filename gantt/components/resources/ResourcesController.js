/**
 * Created by Balog �bel P�ter on 2015.07.30..
 */
///<reference path='../../../references.ts' />
var app;
(function (app) {
    var ResourceType = Model.Resources.ResourceType;
    var ResourcesController = (function () {
        function ResourcesController($mdDialog, resources) {
            this.$mdDialog = $mdDialog;
            this.resources = resources;
            this.show = -1;
            this.newResource = new ResourceType();
            console.log(resources);
        }
        return ResourcesController;
    })();
    app.ResourcesController = ResourcesController;
})(app || (app = {}));
//# sourceMappingURL=ResourcesController.js.map