import { inject, Injectable } from "@angular/core";
import { env } from "../../environment/env";
import { HttpClient } from "@angular/common/http";
import { type SessionInfoModel } from "../models/sessionInfo.model";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadModel } from "../models/jwt.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = env.aplUrl;
    private httpClient = inject(HttpClient);
    private router = inject(Router);

    login(email: string, password: string) {
        const url = this.baseUrl + '/login';
        return this.httpClient.post<SessionInfoModel>(url, {
            email,
            password
        });
    }

    logout() {
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    getCurrentEmpRole() {
        return this.httpClient.get<{ role: string }>(`${this.baseUrl}/emp/role`);
    }

    getRole() {
        const token = sessionStorage.getItem('token');
        if (!token) return null;
        const decode = jwtDecode<JwtPayloadModel>(token)
        return decode.role;
    }
}