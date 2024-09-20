// Alias
type Lecturer = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string[];
};

type StudentType = { getRating: () => number };

// Classes
class School {
  _areas: string[] = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): string[] {
    return this._areas;
  }

  addArea(area: string): void {
    if (this._areas.includes(area)) {
      return;
    }
    this._areas.push(area);
  }

  removeArea(area: string): void {
    const index = this._areas.indexOf(area);
    if (index === -1) {
       return;
    }
    this._areas.splice(index, 1);
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addLecture(lecture: Lecturer): void {
    if (this._lecturers.includes(lecture)) {
      return;
    }
    this._lecturers.push(lecture);
  }

  removeLecture(lecturer: Lecturer): void {
    const index = this._lecturers.indexOf(lecturer);
    if (index === -1) {
       return;
    }
    this._lecturers.splice(index, 1);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: number[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: number): void {
    if (this._levels.includes(level)) {
      return;
    }
    this._levels.push(level);
  }

  removeLevel(level: number): void {
    this._levels.filter((item: number) => item !== level);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: string[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  addGroups(group: string): void {
    if (this._groups.includes(group)) {
      return;
    }
    this._groups.push(group);
  }

  removeGroups(group: string): void {
    this._groups.filter((g: string) => g !== group);
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: string;
  _status: string;
  _students: StudentType[] = []; // Modify the array so that it has a valid toSorted method*
  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string, area: string, status: string) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._area = area;
    this._status = status;
  }

  get area(): string {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  get students(): StudentType[] {
    return this._students;
  }

  addStudent(student: StudentType): void {
    this._students.push(student);
  }

  removeStudent(student: StudentType): void {
    this._students = this._students.filter((s: StudentType) => s !== student);
  }

  setStatus(status: string): void {
    this._status = status;
  }

  showPerformance(): StudentType[] {
    const sortedStudents = this._students.toSorted((a: StudentType, b: StudentType) => {
      return b.getRating() - a.getRating()
    });
    return sortedStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;

  // Не впевнений що зрозумів яка тут конструкція workName: mark
  
  _grades: number[] = []; // workName: mark
  _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (this._visits.filter((present: boolean) => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }

  setGrade(workName: number): void {
    this._grades.push(workName);
  }

  setVisit(present: boolean): void {
    this._visits.push(present);
  }
}