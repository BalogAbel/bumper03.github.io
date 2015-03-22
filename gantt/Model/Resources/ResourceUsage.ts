///<reference path='../../../references.ts'/>

module Model.Resources {
	import ResourceType = Model.Resources.ResourceType;

	export class ResourceUsage {
		id: number;
		resource: ResourceType;
		need: number;
	}
}