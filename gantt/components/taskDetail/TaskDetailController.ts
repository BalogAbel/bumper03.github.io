///<reference path='../../../references.ts' />

module app {
    import Task = Model.Task;
    import Summary = Model.Summary;
    import Schedulable = Model.Schedulable;
    import Project = Model.Project;
    import Dependency = Model.Dependency;
    import ResourceUsage = Model.Resources.ResourceUsage;

    export class TaskDetailController {
        private task: Task;
        private isSummary: boolean;
        private hasEarliestConstraint: boolean;
        private opened: boolean;
        private newDependency: Dependency = new Dependency();
        private newResourceUsage: ResourceUsage = new ResourceUsage();

        constructor(private project: Project) {
            this.task = new Schedulable();
            this.isSummary = this.task instanceof Model.Summary;
            this.hasEarliestConstraint = this.task.earliestStartConstraint != null;
            this.opened = false;
        }

        addDependency(): void {
            this.task.predecessors.push(this.newDependency);
            var successor = new Dependency();
            successor.task = this.task;
            successor.lag = this.newDependency.lag;
            this.newDependency.task.successors.push(successor);
            this.newDependency = new Dependency();
            this.newResourceUsage = new ResourceUsage();
        }

        addResourceUsage(): void {
            this.task.resourceUsages.push(this.newResourceUsage);
            this.newResourceUsage = new ResourceUsage();
        }

    }
}