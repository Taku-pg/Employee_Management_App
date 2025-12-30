import { Language } from "./emp.model";

export interface UpdateEmpModel {
    firstname?: string,
    lastname?: string,
    email?: string,
    salary?: number,
    department?: string,
    languages?: Language[]
}