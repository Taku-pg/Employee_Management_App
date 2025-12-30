import { SimpleEmployeeModel } from "./simpleEmp.model";

export interface RoleModel{
    name: string,
    employees: SimpleEmployeeModel[]
}