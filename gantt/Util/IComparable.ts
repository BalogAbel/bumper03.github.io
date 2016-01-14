export interface IComparable {

    /**
     * Compares the two interval element
     * If the object attribute is equal to the argument then 0 is returned.
     * If the object is less than the argument then negative number is returned.
     * If the object is greater than the argument then positive number is returned.
     * @param t
     * @return a negative number, zero, or a positive number as the object is less than, equal to, or greater than the attribute.
     */
    compare(t:any): number;
}