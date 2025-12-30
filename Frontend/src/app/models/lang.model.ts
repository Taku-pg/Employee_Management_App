import { SimpleEmployeeModel } from "./simpleEmp.model";

export interface LanguageModel{
    name: string,
    numberOfNativeCountry: number,
    employees: SimpleEmployeeModel[]
}