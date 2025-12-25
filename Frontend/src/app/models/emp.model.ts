interface language{
    language_name: string,
    language_level: string
}

export interface EmployeeModel{
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    hireDate: Date,
    salary: number,
    department: string,
    role: string,
    languages: language[]
}