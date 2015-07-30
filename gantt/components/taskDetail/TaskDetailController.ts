///<reference path='../../../references.ts' />

module app {
    import Project = Model.Project;
    import Task = Model.Task;
    import Dependency = Model.Dependency;
    import ResourceUsage = Model.Resources.ResourceUsage;

    export class TaskDetailController {
        private newDependency: Dependency;
        private newResourceUsage: ResourceUsage;

        constructor(private $mdDialog: ng.material.IDialogService, private project: Project, private task: TaskVO) {
            this.newResourceUsage = new ResourceUsage();
            this.newDependency = new Dependency();
        }

        addDependency(): void {
            this.task.dependencies.push(this.newDependency);
            this.newDependency = new Dependency();
        }

        removeDependency(dependency: Dependency): void {
            var idx = this.task.dependencies.indexOf(dependency);
            if (idx == -1) return;
            this.task.dependencies.splice(idx, 1);
        }

        addResourceUsage(): void {
            this.task.resourceUsages.push(this.newResourceUsage);
            this.newResourceUsage = new ResourceUsage();
        }

        removeResourceUsage(resourceUsage: ResourceUsage): void {
            var idx = this.task.resourceUsages.indexOf(resourceUsage);
            if (idx == -1) return;
            this.task.resourceUsages.splice(idx, 1);
        }

        save(): void {
            this.$mdDialog.hide(this.task);
        }

        cancel(): void {
            this.$mdDialog.hide();
        }


    }
}