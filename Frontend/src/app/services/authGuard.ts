import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterState, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, Observable, tap } from "rxjs";


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
    const authService=inject(AuthService);
    const router=inject(Router);
    return authService.getCurrentEmpRole().pipe(
        map(res=>{
            const empRole=res.role;
            if(!empRole){
                return router.createUrlTree(['login']);
            }

            const requireRole=route.data['role'] as string;

            console.log(requireRole);
            console.log()

            if(requireRole && requireRole!==empRole){
                return router.createUrlTree(['error/403']);
            }

            return true;
        })
    );
}