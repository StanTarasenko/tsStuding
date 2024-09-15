class School {
    directions: string[] = [];
  
    addDirection(direction: string): void {
      this.directions.push(direction);
    }
  }
  
  class Direction {
    levels: string[] = [];
  
    _firstName: string;
  
    get firstName(): string {
      return this._firstName;
    }
  
    constructor(name: string) {
      this._firstName = name;
    }
  
    addLevel(level: string): void {
      this.levels.push(level);
    }
  }
  
  class Level {
    groups: string[] = [];
  
    _name!: string;
    _program!: string;
  
    constructor(name: string, program: string) {
      this._name = name;
      this._program = program;
    }
  
    get name(): string {
      return this._name;
    }
  
    get program(): string {
      return this._program;
    }
  
    addGroup(group: string): void {
      this.groups.push(group);
    }
  }
  
  class Group {
    _students: any[] = [];
  
    get students(): any {
      return this._students;
    }
  
    directionName: string;
    levelName: string;
  
    constructor(directionName: string, levelName: string) {
      this.directionName = directionName;
      this.levelName = levelName;
    }
  
    addStudent(student: any): void {
      this._students.push(student);
    }
  
    showPerformance(): any[] {
      const sortedStudents = this.students.toSorted(
        (a: any, b: any) => b.getPerformanceRating() - a.getPerformanceRating()
      );
  
      return sortedStudents;
    }
  }
  
  class Student {
    grades: { [subject: string]: number } = {};
    attendance: number[] = [];
  
    firstName: string;
    lastName: string;
    birthYear: number;
  
    constructor(firstName: string, lastName: string, birthYear: number) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthYear = birthYear;
    }
  
    get fullName(): string {
      return `${this.lastName} ${this.firstName}`;
    }
  
    set fullName(value: string) {
      [this.lastName, this.firstName] = value.split(" ");
    }
  
    get age(): number {
      return new Date().getFullYear() - this.birthYear;
    }
  
    setGrade(subject: string, grade: number): void {
      this.grades[subject] = grade;
    }
  
    markAttendance(present: number): void {
      this.attendance.push(present);
    }
  
    getPerformanceRating(): number {
      const gradeValues: number[] = Object.values(this.grades);
  
      if (gradeValues.length === 0) return 0;
  
      const averageGrade: number =
        gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
  
      const attendancePercentage: number =
        (this.attendance.filter((present) => present).length /
          this.attendance.length) *
        100;
  
      return (averageGrade + attendancePercentage) / 2;
    }
  }
  