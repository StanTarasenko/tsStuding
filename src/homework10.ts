// DeepReadonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object 
    ? T[K] extends Function 
      ? T[K] 
      : DeepReadonly<T[K]> 
    : T[K];
};

// DeepRequireReadonly
type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends object 
    ? T[K] extends Function 
      ? T[K] 
      : DeepRequireReadonly<T[K]> 
    : T[K];
};

// UpperCaseKeys
type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

// ObjectToPropertyDescriptor
type CustomPropertyDescriptor<T> = {
  value: T;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
};

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: CustomPropertyDescriptor<T[K]>;
};
