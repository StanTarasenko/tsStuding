// 1. Define an interface that uses an index signature with union types
interface IUnionObject {
    [key: string]: number | string;
}

// 2. Create an interface where the value types in the index signature are functions.
interface IFunctionObject {
    [key: string]: (...args: any[]) => any;
}

// 3. Describe an interface that uses an index signature to describe 
// an array-like object.
interface INumberIndexedArray<T> {
    [index: number]: T;
}

/* T — це узагальнений параметр типу, 
який дозволяє зробити інтерфейс гнучким 
для роботи з різними типами, представляє будь-який тип даних. */

// 4. Create an interface with specific properties and an index signature.
interface IPerson {
    name: string;
    [key: string]: string | number;
}

// 5. Create two interfaces, one with an index signature, 
// the other extending the first by adding specific properties.
interface IParentObject {
    [key: string]: any;
}

interface IChildObject extends IParentObject {
    id: number;
    name: string;
}

// 6. Function that takes an object with an index signature and checks 
// whether the values ​​of certain keys meet certain criteria
function areAllValuesNumbers(obj: { [key: string]: any }): boolean {
    return Object.values(obj).every(value => typeof value === 'number');
}
