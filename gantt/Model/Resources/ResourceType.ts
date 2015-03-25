///<reference path='../../../references.ts'/>

module Model.Resources {
	export class ResourceType implements Util.ISerializable<ResourceType> {
		id: number;
		available: number;
		name: string;

		deserialize(input: any): ResourceType {
			this.id = input.id;
			this.available = input.available;
			this.name = input.name;
			return this;
		}


	}
}