///<reference path='IComparable.ts'/>

module Util {
    import IComparable = Util.IComparable;
    export interface IInterval extends IComparable{
        doOverLapWith(t: any): boolean;
    }
}