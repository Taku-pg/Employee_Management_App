import { inject, Injectable } from "@angular/core";
import { env } from "../../environment/env";
import { HttpClient } from "@angular/common/http";
import { EmployeeModel } from "../models/emp.model";
import { map } from "rxjs";
import { SimpleEmployeeModel } from "../models/simpleEmp.model";
import { NewEmployeeModel } from "../models/newEmp.model";
import { DeptModel } from "../models/dept.model";
import { RoleDetail } from "../views/role-detail/role-detail";
import { RoleModel } from "../models/role.model";


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

    getDeptDetail(deptId: string){
        return this.httpClient.get<DeptModel>(`${this.baseUrl}/dept/${deptId}`);
    }

    getRoleDetail(roleId: string){
        return this.httpClient.get<RoleModel>(`${this.baseUrl}/role/${roleId}`);
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

    changePassword(passwords: any){
        return this.httpClient.post(`${this.baseUrl}/emp/change-password`,passwords);
    }

    changeManager(deptId: string,oldManagerID: string,newManagerId: string){
        return this,this.httpClient.post(`${this.baseUrl}/dept/${deptId}`,
            {
                oldId: oldManagerID,
                newId: newManagerId
            });
    }

    patchEmp(id: string, patchData: any){
        return this.httpClient.patch(`${this.baseUrl}/emp/${id}`,patchData);
    }

    deleteEmp(id: string){
        return this.httpClient.delete(`${this.baseUrl}/emp/${id}`);
    }

    getAllInfo(){
        return this.httpClient.get<any[]>(`${this.baseUrl}/admin`);
    }
}