import { SimpleEmployeeModel } from "./simpleEmp.model";

export interface LanguageLevelModel{
    name: string,
    employees: SimpleEmployeeModel[]
}