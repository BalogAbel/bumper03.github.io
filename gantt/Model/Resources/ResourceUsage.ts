///<reference path='../../../references.ts'/>

module Model.Resources {
	import ResourceType = Model.Resources.ResourceType;

	export class ResourceUsage implements Util.ISerializable<ResourceUsage>{
		id: number;
		resource: ResourceType;
		need: number;

		deserialize(input: any): ResourceUsage {
			this.id = input.id;
			this.resource = new ResourceType().deserialize(input.resource);
			this.need = input.need;
			return this;
		}
	}
}