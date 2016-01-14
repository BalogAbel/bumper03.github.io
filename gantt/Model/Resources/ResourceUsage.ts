import {ResourceType} from "./ResourceType";
import {ISerializable} from "../../Util/Serializer";

export class ResourceUsage implements ISerializable<ResourceUsage> {
    id:number;
    resource:ResourceType;
    need:number;

    deserialize(input:any):ResourceUsage {
        this.id = input.id;
        this.resource = new ResourceType().deserialize(input.resource);
        this.need = input.need;
        return this;
    }
}