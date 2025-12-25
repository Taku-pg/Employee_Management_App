import { inject, Injectable } from "@angular/core";
import { env } from "../../environment/env";
import { HttpClient } from "@angular/common/http";
import { EmployeeModel } from "../models/emp.model";
import { map } from "rxjs";
import { EmployeeResponseModel } from "../models/empResponseModel";
import { SimpleEmployeeModel } from "../models/simpleEmp.model";


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
        return this,this.httpClient.get<string[]>(`${this.baseUrl}/language`);
    }

    getEmpDetail(empId: string){
        return this.httpClient.get<{emp:EmployeeModel}>(`${this.baseUrl}/emp/${empId}`).pipe(map(res=>res.emp));
    }


}