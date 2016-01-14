import {ISerializable} from "../../Util/Serializer";

export class ResourceType implements ISerializable<ResourceType> {
    id:number;
    available:number;
    name:string;

    deserialize(input:any):ResourceType {
        if (!input.hasOwnProperty('available')) return input;
        this.id = input.id;
        this.available = input.available;
        this.name = input.name;
        return this;
    }


}