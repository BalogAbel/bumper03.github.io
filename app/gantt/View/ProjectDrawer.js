///<reference path='../../../references.ts'/>
var View;
(function (View) {
    var TaskDrawer = View.TaskDrawer;
    var TaskDrawerFactory = View.TaskDrawerFactory;
    var TimeLineDrawer = View.TimeLineDrawer;
    var Utils = View.Utils;
    var ProjectDrawer = (function () {
        function ProjectDrawer(project) {
            ProjectDrawer._instance = this;
            this.project = project;
            Utils.startDate = new Date(project.start.getTime());
            Utils.startDate.setDate(Utils.startDate.getDate() - 7);
            Utils.finishDate = new Date(project.finish.getTime());
            Utils.finishDate.setDate(Utils.finishDate.getDate() + 7);
            $("#timeLineWrapper").animate({
                scrollLeft: 7 * Utils.dayWidth
            }, 1);
            this.handleScroll();
            this.handleAddDates();
            this.handleZoom();
        }
        ProjectDrawer.prototype.draw = function () {
            this.generateTaskDrawers();
            var taskStage = new Kinetic.Stage({
                container: 'tasks',
                width: 400,
                height: 100
            });
            taskStage.clear();
            TaskDrawer.actualPosition = { x: 0, y: Utils.taskLineHeight * 1.5 };
            var taskLayer = new Kinetic.Layer();
            var timeLineLayer = new Kinetic.Layer();
            for (var i = 0; i < this.taskDrawers.length; i++) {
                this.taskDrawers[i].draw(taskLayer, timeLineLayer);
            }
            taskStage.add(taskLayer);
            taskStage.height(TaskDrawer.actualPosition.y);
            var timeLineStage = new Kinetic.Stage({
                container: 'timeLine',
                width: Utils.getCanvasWidth(),
                height: 100
            });
            var timelineDrawer = new TimeLineDrawer();
            timelineDrawer.draw(timeLineLayer);
            timeLineStage.add(timeLineLayer);
            timeLineStage.height(Utils.getCanvasHeight());
        };
        ProjectDrawer.refresh = function () {
            if (ProjectDrawer._instance != null) {
                ProjectDrawer._instance.project.schedule();
                ProjectDrawer._instance.draw();
            }
        };
        ProjectDrawer.prototype.generateTaskDrawers = function () {
            this.taskDrawers = [];
            for (var i = 0; i < this.project.tasks.length; i++) {
                this.taskDrawers.push(TaskDrawerFactory.getTaskDrawer(this.project.tasks[i]));
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
                Utils.startDate.setDate(Utils.startDate.getDate() - 7);
                that.draw();
            });
            $("#addAfter").click(function () {
                Utils.finishDate.setDate(Utils.finishDate.getDate() + 7);
                that.draw();
            });
        };
        ProjectDrawer.prototype.handleZoom = function () {
            var that = this;
            $("#slider").on("slidechange", function (evt, ui) {
                Utils.dayWidth = ui.value;
                that.draw();
            });
        };
        ProjectDrawer._instance = null;
        return ProjectDrawer;
    })();
    View.ProjectDrawer = ProjectDrawer;
})(View || (View = {}));
//# sourceMappingURL=ProjectDrawer.js.map