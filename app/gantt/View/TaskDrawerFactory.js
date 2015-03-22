///<reference path='../../../references.ts'/>
var View;
(function (View) {
    var Schedulable = Model.Schedulable;
    var Summary = Model.Summary;
    var SchedulableDrawer = View.SchedulableDrawer;
    var SummaryDrawer = View.SummaryDrawer;
    var TaskDrawerFactory = (function () {
        function TaskDrawerFactory() {
        }
        TaskDrawerFactory.getTaskDrawer = function (task) {
            var drawer;
            if (task instanceof Summary)
                drawer = TaskDrawerFactory.getSummaryDrawer(task);
            else if (task instanceof Schedulable)
                drawer = new SchedulableDrawer();
            else
                throw ("Task type error");
            drawer.task = task;
            return drawer;
        };
        TaskDrawerFactory.getSummaryDrawer = function (summary) {
            var sumDrawer = new SummaryDrawer();
            sumDrawer.task = summary;
            for (var i = 0; i < summary.tasks.length; i++) {
                sumDrawer.subDrawers.push(TaskDrawerFactory.getTaskDrawer(summary.tasks[i]));
            }
            return sumDrawer;
        };
        return TaskDrawerFactory;
    })();
    View.TaskDrawerFactory = TaskDrawerFactory;
})(View || (View = {}));
//# sourceMappingURL=TaskDrawerFactory.js.map