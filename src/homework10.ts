// DeepReadonly
type DeepReadonly = {
    a: {
      b: {
        c: string;
      };
    };
    d: number[];
    e: () => void;
};

// DeepRequireReadonly
type Example = {
    a?: {
      b?: {
        c?: string;
      };
    };
    d?: number[];
    e: () => void;
};
