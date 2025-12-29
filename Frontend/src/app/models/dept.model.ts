import { SimpleEmployeeModel } from "./simpleEmp.model";

export interface DeptModel{
    id: string,
    name: string,
    minSal: number,
    managerId: string,
    employees: SimpleEmployeeModel[]
}