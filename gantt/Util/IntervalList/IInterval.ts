import {IComparable} from "../IComparable";

export interface IInterval extends IComparable {
    doOverLapWith(t:any): boolean;
}