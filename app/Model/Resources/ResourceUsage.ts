///<reference path='ResourceType.ts'/>


module Model.Resources {
	import ResourceType = Model.Resources.ResourceType;

	export class ResourceUsage {
		id: number;
		resource: ResourceType;
		need: number;
	}
}