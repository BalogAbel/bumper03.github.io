"use strict";
//
//export class Serializer {
//    static serialize(object): string {
//        return JSON.decycle(object);
//    }
//
//
//
//    static deSerialize(str: string, clazz) {
//        var instance = new clazz();
//        var object: Object = JSON.retrocycle(str);
//        for(var prop in json) {
//            if(!json.hasOwnProperty(prop)) {
//                continue;
//            }
//
//            if(typeof json[prop] === 'object') {
//                instance[prop] = Serializer.deSerialize(json[prop], types[prop]);
//            } else {
//                instance[prop] = json[prop];
//            }
//        }
//    }
//} 
//# sourceMappingURL=Serializer.js.map