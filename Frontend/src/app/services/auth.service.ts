import { inject, Injectable } from "@angular/core";
import { env } from "../../environment/env";
import { HttpClient } from "@angular/common/http";
import { type SessionInfoModel } from "../models/sessionInfoModel";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private baseUrl=env.aplUrl;
    private httpClient=inject(HttpClient);

    login(email:string,password: string){
        const url=this.baseUrl+'/login';
        return this.httpClient.post<SessionInfoModel>(url,{
            email,
            password
        });
    }

    getCurrentEmpRole(){
        return this.httpClient.get<{role: string}>(`${this.baseUrl}/emp/role`);
    }
}