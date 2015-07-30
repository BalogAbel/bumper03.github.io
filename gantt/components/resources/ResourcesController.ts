/**
 * Created by Balog Ábel Péter on 2015.07.30..
 */
///<reference path='../../../references.ts' />

module app {
    import ResourceType = Model.Resources.ResourceType;

    export class ResourcesController {
        private newResource: ResourceType;

        constructor(private $mdDialog: ng.material.IDialogService, private resources: ResourceType[]) {
            console.log("asd");
            this.newResource = new ResourceType();
            console.log(resources);
        }

        //addDependency(): void {
        //    this.task.dependencies.push(this.newDependency);
        //    this.newDependency = new Dependency();
        //}
        //
        //removeDependency(dependency: Dependency): void {
        //    var idx = this.task.dependencies.indexOf(dependency);
        //    if (idx == -1) return;
        //    this.task.dependencies.splice(idx, 1);
        //}
        //
        //addResourceUsage(): void {
        //    this.task.resourceUsages.push(this.newResourceUsage);
        //    this.newResourceUsage = new ResourceUsage();
        //}
        //
        //removeResourceUsage(resourceUsage: ResourceUsage): void {
        //    var idx = this.task.resourceUsages.indexOf(resourceUsage);
        //    if (idx == -1) return;
        //    this.task.resourceUsages.splice(idx, 1);
        //}
        //
        //save(): void {
        //    this.$mdDialog.hide(this.task);
        //}
        //
        //cancel(): void {
        //    this.$mdDialog.hide();
        //}


    }
}