type Decorator = (
    target: Function,
    context: {
      kind: string;
      name: string | symbol;
      access: {
        get?(): unknown;
        set?(value: unknown): void;
      };
      private?: boolean;
      static?: boolean;
      addInitializer?(initializer: () => void): void;
    }
) => Function | void;

const MyDecorator: Decorator = (target, context) => {
  console.log(context.kind, context.name);
  return target;
};

interface IRocket {
  thankVolume: number; 
  isReadyForCheck(): boolean; 
}

class Rocket {
  public fuel = 75;

  public checkStart(): boolean {
    return this.fuel !== 0 
  }
};
