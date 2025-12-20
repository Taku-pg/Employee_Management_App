import { inject, Injectable } from "@angular/core";
import { env } from "../../environment/env";
import { HttpClient } from "@angular/common/http";
import { EmployeeModel } from "../models/emp.model";
import { map } from "rxjs";
import { EmployeeResponseModel } from "../models/empResponseModel";


@Injectable({
    providedIn: 'root'
})
export class ApiService{
    private baseUrl=env.aplUrl;
    private httpClient=inject(HttpClient);

    getHello(root: string){
        const url=this.baseUrl+root;
        return this.httpClient.get<string>(url);
    }

    getMyInfo(){
        return this.httpClient.get<EmployeeResponseModel>(`${this.baseUrl}/emp/me`)
        .pipe(map(res=>res.emp));
    }
}