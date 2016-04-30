export interface Hashable {
    hash(): number;
    deserialize(input: any): Hashable;
    getNew(): Hashable;
}
