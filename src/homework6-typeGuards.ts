// Interfaces
interface Employee {
    id: number;
    name: string;
    position: string;
    departmentId?: number;
}

interface PreHiredEmployee extends Employee {
    hireDate: Date;
}

interface Budget {
    debit: number;
    credit: number;
}

class Department {
    private employees: Employee[] = [];
    private budget: Budget;

    constructor(
        public name: string,
        public domain: string,
        initialBudget: Budget
    ) {
        this.budget = initialBudget;
    }

    calculateBalance(): number {
        return this.budget.debit - this.budget.credit;
    }

    addEmployee(newEmployee: Employee): void {
        this.employees.push(newEmployee);
        this.updateBudgetOnNewHire();
    }

    hirePreHiredEmployee(preHiredEmployee: PreHiredEmployee): void {
        const existingIndex = this.employees.findIndex(emp => emp.id === preHiredEmployee.id);
        if (existingIndex === -1) {
            this.addEmployee(preHiredEmployee);
            console.log(`${preHiredEmployee.name} найнятий до департаменту ${this.name}`);
        } else {
            console.log(`${preHiredEmployee.name} вже працює в цьому департаменті`);
        }
    }

    removeEmployee(employeeId: number): void {
        const employeeIndex = this.employees.findIndex(emp => emp.id === employeeId);
        if (employeeIndex !== -1) {
            const removedEmployee = this.employees.splice(employeeIndex, 1)[0];
            console.log(`${removedEmployee.name} був видалений з департаменту ${this.name}`);
        } else {
            console.log(`Співробітника з ID ${employeeId} не знайдено в департаменті`);
        }
    }

    private updateBudgetOnNewHire(): void {
        const hireCost = 1000;
        this.budget.credit += hireCost;
        console.log(`Бюджет оновлено після найму співробітника. Новий кредит: ${this.budget.credit}`);
    }

    getEmployees(): Employee[] {
        return this.employees;
    }

    getBudgetInfo(): Budget {
        return this.budget;
    }
}

class Company {
    public departments: Department[] = [];
    public preHiredStaff: PreHiredEmployee[] = [];

    constructor(public name: string) {}

    addDepartment(department: Department): void {
        this.departments.push(department);
    }

    hirePreHiredEmployee(employee: PreHiredEmployee, departmentName: string): void {
        const department = this.departments.find(dept => dept.name === departmentName);

        if (department) {
            department.hirePreHiredEmployee(employee);
            this.preHiredStaff = this.preHiredStaff.filter(e => e.id !== employee.id);
        } else {
            console.log(`Департамент з назвою ${departmentName} не знайдено`);
        }
    }

    getAllEmployees(): Employee[] {
        const departmentEmployees = this.departments.flatMap(dept => dept.getEmployees());
        return [...departmentEmployees, ...this.preHiredStaff];
    }
}
