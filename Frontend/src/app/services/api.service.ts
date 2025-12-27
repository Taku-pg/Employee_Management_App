import { inject, Injectable } from "@angular/core";
import { env } from "../../environment/env";
import { HttpClient } from "@angular/common/http";
import { EmployeeModel } from "../models/emp.model";
import { map } from "rxjs";
import { EmployeeResponseModel } from "../models/empResponseModel";
import { SimpleEmployeeModel } from "../models/simpleEmp.model";
import { NewEmployeeModel } from "../models/newEmp.model";


@Injectable({
    providedIn: 'root'
})
export class ApiService{
    private baseUrl=env.aplUrl;
    private httpClient=inject(HttpClient);

    getMyInfo(){
        return this.httpClient.get<{emp:EmployeeModel}>(`${this.baseUrl}/emp/me`)
        .pipe(map(res=>res.emp));
    }

    getAllDeptEmp(){
        return this.httpClient.get<{employees:SimpleEmployeeModel[]}>(`${this.baseUrl}/emp/manager`);
    }

    getAllEmp(){
        return this.httpClient.get<{employees: SimpleEmployeeModel[]}>(`${this.baseUrl}/emp/admin`);
    }

    getAllDept(){
        return this.httpClient.get<string[]>(`${this.baseUrl}/dept`);
    }

    getAllLanguage(){
        return this.httpClient.get<string[]>(`${this.baseUrl}/language`);
    }

    getLanguageLevels(){
        return this.httpClient.get<string[]>(`${this.baseUrl}/language/language-level`);
    }

    getEmpDetail(empId: string){
        return this.httpClient.get<{emp:EmployeeModel}>(`${this.baseUrl}/emp/${empId}`).pipe(map(res=>res.emp));
    }

    getMinSalary(){
        return this.httpClient.get<number>(`${this.baseUrl}/dept/min-salary`);
    }

    checkUniqueEmail(email: string){
        return this.httpClient.get<boolean>(`${this.baseUrl}/emp/check-email`, {params: {email}});
    }

    createEmployee(newEmp: NewEmployeeModel){
        return this.httpClient.post(`${this.baseUrl}/emp/new-emp`,newEmp)
    }

}