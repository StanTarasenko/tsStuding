// Circle, Rectangle, Square і Triangle

abstract class GeometricFigure {
    public readonly color: string;
    public readonly name: string;

    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }

    public abstract calculateArea(): number;
}

// Classes

class Circle extends GeometricFigure {
    public radius: number;

    constructor(color: string = "red", name: string = "circle", radius: number) {
        super(color, name);
        this.radius = radius;
    }

    public calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends GeometricFigure {
    public width: number;
    public height: number;

    constructor(color: string = "green", name: string = "rectangle", width: number, height: number) {
        super(color, name);
        this.width = width;
        this.height = height;
    }

    public calculateArea(): number {
        return this.width * this.height;
    }

    public print(): void {
        console.log(`Area of ${this.name} = width * height = ${this.width} * ${this.height}`);
    }
}

class Square extends GeometricFigure {
    public sideLength: number;

        public calculateArea(): number {
            return this.sideLength * this.sideLength;
    }

    public print(): void {
        console.log(`Area of ${this.name} = sideLength * sideLength = ${this.sideLength} * ${this.sideLength}`);
    }

    constructor(color: string = "black", name: string = "square", sideLength: number) {
        super(color, name);
        this.sideLength = sideLength;
    }
}

class Triangle extends GeometricFigure {
    public base: number;
    public height: number;

        public calculateArea(): number {
            return 0.5 * this.base * this.height;
    }

    constructor(color: string = "yellow", name: string = "triangle", base: number, height: number) {
        super(color, name);
        this.base = base;
        this.height = height;
    }
}
