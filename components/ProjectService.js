var Project_1 = require("../gantt/Model/Project");
var SelectItemController_1 = require("./SelectItemDialog/SelectItemController");
var ProjectService = (function () {
    function ProjectService(gDriveService, $mdDialog, $window) {
        this.gDriveService = gDriveService;
        this.$mdDialog = $mdDialog;
        this.$window = $window;
        this.project = null;
    }
    ProjectService.prototype.get = function () {
        if (this.project == null) {
            var projectObj = JSON.parse(localStorage.getItem("project"));
            this.project = new Project_1.Project();
            if (projectObj != null) {
                this.project.deserialize(projectObj);
                JSON.retrocycle(this.project);
            }
        }
        return this.project;
    };
    ProjectService.prototype.set = function (project) {
        localStorage.setItem("project", JSON.stringify(JSON.decycle(project)));
        this.project = project;
    };
    ProjectService.prototype.loadFromGDrive = function () {
        var _this = this;
        return this.gDriveService.list().then(function (files) {
            return _this.$mdDialog.show({
                controller: SelectItemController_1.SelectItemController,
                controllerAs: "selectItemCtrl",
                templateUrl: 'components/SelectItemDialog/SelectItem.html',
                locals: {
                    title: 'project',
                    items: files
                }
            });
        }).then(function (item) {
            return _this.gDriveService.open(item.downloadUrl);
        });
    };
    ProjectService.prototype.saveToGoogleDrive = function () {
        this.gDriveService.save(this.project);
    };
    ProjectService.prototype.saveToLocal = function () {
        var data = new Blob([JSON.stringify(JSON.decycle(this.project))], { type: 'application/json' });
        var fileName = this.project.name + ".gnt";
        var e = document.createEvent('MouseEvents');
        var a = document.createElement('a');
        a.download = fileName;
        a.href = this.$window.URL.createObjectURL(data);
        a.dataset.downloadUrl = ['application/json', a.download, a.href];
        e.initMouseEvent('click', true, false, this.$window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    };
    return ProjectService;
})();
exports.ProjectService = ProjectService;
//# sourceMappingURL=ProjectService.js.map