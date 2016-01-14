var TaskDrawer_1 = require("./TaskDrawer");
var Utils_1 = require("./Utils");
var TimeLineDrawer_1 = require("./TimeLineDrawer");
var TaskDrawerFactory_1 = require("./TaskDrawerFactory");
var ProjectDrawer = (function () {
    function ProjectDrawer(project) {
        ProjectDrawer._instance = this;
        this.project = project;
        Utils_1.Utils.startDate = new Date(project.start.getTime());
        Utils_1.Utils.startDate.setDate(Utils_1.Utils.startDate.getDate() - 7);
        Utils_1.Utils.finishDate = new Date(project.finish.getTime());
        Utils_1.Utils.finishDate.setDate(Utils_1.Utils.finishDate.getDate() + 7);
        //$("#timeLineWrapper").animate({
        //    scrollLeft: 7 * Utils.dayWidth
        //}, 1);
        this.handleScroll();
        this.handleAddDates();
    }
    ProjectDrawer.prototype.draw = function () {
        this.generateTaskDrawers();
        var taskStage = new Konva.Stage({
            container: 'tasks',
            width: 400,
            height: 100
        });
        taskStage.clear();
        TaskDrawer_1.TaskDrawer.actualPosition = { x: 0, y: Utils_1.Utils.taskLineHeight * 1.5 };
        this.taskLayer = new Konva.Layer();
        this.timeLineLayer = new Konva.Layer();
        for (var i = 0; i < this.taskDrawers.length; i++) {
            this.taskDrawers[i].draw(this.taskLayer, this.timeLineLayer);
        }
        taskStage.add(this.taskLayer);
        taskStage.height(TaskDrawer_1.TaskDrawer.actualPosition.y);
        var timeLineStage = new Konva.Stage({
            container: 'timeLine',
            width: Utils_1.Utils.getCanvasWidth(),
            height: 100
        });
        var timelineDrawer = new TimeLineDrawer_1.TimeLineDrawer();
        timelineDrawer.draw(this.timeLineLayer);
        timeLineStage.add(this.timeLineLayer);
        timeLineStage.height(Utils_1.Utils.getCanvasHeight());
    };
    ProjectDrawer.refresh = function () {
        if (ProjectDrawer._instance != null) {
            ProjectDrawer._instance.update();
        }
    };
    ProjectDrawer.prototype.update = function () {
        this.project.schedule();
        for (var i = 0; i < this.taskDrawers.length; i++) {
            this.taskDrawers[i].update(this.timeLineLayer);
        }
        //ProjectDrawer._instance.draw();
    };
    ProjectDrawer.prototype.generateTaskDrawers = function () {
        this.taskDrawers = [];
        for (var i = 0; i < this.project.tasks.length; i++) {
            this.taskDrawers.push(TaskDrawerFactory_1.TaskDrawerFactory.getTaskDrawer(this.project.tasks[i]));
        }
    };
    ProjectDrawer.prototype.handleScroll = function () {
        var that = this;
    };
    ProjectDrawer.prototype.getCenterDate = function () {
    };
    ProjectDrawer.prototype.handleAddDates = function () {
        var that = this;
        $("#addBefore").click(function () {
            Utils_1.Utils.startDate.setDate(Utils_1.Utils.startDate.getDate() - 7);
            that.draw();
        });
        $("#addAfter").click(function () {
            Utils_1.Utils.finishDate.setDate(Utils_1.Utils.finishDate.getDate() + 7);
            that.draw();
        });
    };
    ProjectDrawer.prototype.changeZoom = function (zoomLevel) {
        Utils_1.Utils.dayWidth = zoomLevel;
        this.draw();
    };
    ProjectDrawer._instance = null;
    return ProjectDrawer;
})();
exports.ProjectDrawer = ProjectDrawer;
//# sourceMappingURL=ProjectDrawer.js.map