interface nationality{
    nationality: string,
    region: string
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
    nationalities: nationality[]
}