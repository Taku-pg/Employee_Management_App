import { language } from "./emp.model";

export interface NewEmployeeModel{
    firstname: string,
    lastname: string,
    email: string,
    salary: number,
    languages:language[]
}