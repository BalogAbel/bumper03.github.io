///<reference path='../../lib/kineticjs.d.ts'/>
///<reference path='../Model/Project.ts'/>
///<reference path='TaskDrawer.ts'/>
///<reference path='TaskDrawerFactory.ts'/>
///<reference path='TimeLineDrawer.ts'/>
///<reference path='Utils.ts'/>
var View;
(function (View) {
    var TaskDrawer = View.TaskDrawer;
    var TaskDrawerFactory = View.TaskDrawerFactory;
    var TimeLineDrawer = View.TimeLineDrawer;
    var Utils = View.Utils;

    var ProjectDrawer = (function () {
        function ProjectDrawer() {
            ProjectDrawer._instance = this;
        }
        ProjectDrawer.prototype.draw = function () {
            this.generateTaskDrawers();
            ;
            var taskStage = new Kinetic.Stage({
                container: 'tasks',
                width: 400,
                height: 100
            });
            taskStage.clear();
            TaskDrawer.actualPosition = { x: 0, y: Utils.taskLineHeight };

            Utils.startDate = this.project.start;

            var taskLayer = new Kinetic.Layer();
            var timeLineLayer = new Kinetic.Layer();
            for (var i = 0; i < this.taskDrawers.length; i++) {
                this.taskDrawers[i].draw(taskLayer, timeLineLayer);
            }

            taskStage.add(taskLayer);
            taskStage.height(TaskDrawer.actualPosition.y);

            var timeLineStage = new Kinetic.Stage({
                container: 'timeLine',
                width: 3000,
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

        ProjectDrawer.test = function (stage) {
            var layer = new Kinetic.Layer();

            var rect = new Kinetic.Rect({
                cornerRadius: 10,
                x: 0,
                y: 0,
                width: 100,
                height: 50,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 1
            });

            var group = new Kinetic.Group({
                x: 200,
                y: 150,
                draggable: true,
                dragBoundFunc: function (pos) {
                    var y = this.getAbsolutePosition().y;
                    return {
                        x: pos.x,
                        y: y
                    };
                }
            });

            var taskName = new Kinetic.Text({
                name: 'TaskName',
                text: 'Sample task name'
            });

            group.add(rect);
            group.add(taskName);
            layer.add(group);
            stage.add(layer);
        };
        ProjectDrawer._instance = null;
        return ProjectDrawer;
    })();
    View.ProjectDrawer = ProjectDrawer;
})(View || (View = {}));
//# sourceMappingURL=ProjectDrawer.js.map
