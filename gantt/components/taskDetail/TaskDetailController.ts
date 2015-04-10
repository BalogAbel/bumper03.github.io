/**
 * Created by Balog Ábel Péter on 2015.03.30..
 */
///<reference path='../../../references.ts' />

module app {
    import Task = Model.Task;

    export class TaskDetailController {
        private task: Task;
        private isSummary: boolean;
        private hasEarliestConstraint;
        private opened: boolean;

        constructor(task: Task) {
            this.task = task;
            this.isSummary = task instanceof Model.Summary;
            this.hasEarliestConstraint = task.earliestStartConstraint != null;
            this.opened = false;
        }

        openEarliestConstraintDatePicker($event: ng.IAngularEvent) {
            $event.preventDefault();
            $event.stopPropagation();

            this.opened = true;
        }
    }
}