import {ResourceType} from "../../Model/Resources/ResourceType";

export class ResourcesController {
    private newResource:ResourceType;
    private show = -1;

    constructor(private $mdDialog:ng.material.IDialogService, private resources:ResourceType[]) {
        this.newResource = new ResourceType();
    }

    close(): void {
       this.$mdDialog.hide();
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
