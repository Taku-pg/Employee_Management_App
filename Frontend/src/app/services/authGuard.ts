import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, GuardResult, MaybeAsync, Router, RouterState, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
    authService=inject(AuthService);
    router=inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.authCheck();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.authCheck(childRoute);
    }


    private authCheck(route?: ActivatedRouteSnapshot): MaybeAsync<GuardResult>{
        return this.authService.getCurrentEmpRole().pipe(
        map(res=>{
            const empRole=res.role;
            if(!empRole){
                return this.router.createUrlTree(['login']);
            }

            const requireRole=route?.data['role'] as string | undefined;

            console.log(requireRole);
            console.log()

            if(requireRole && requireRole!==empRole){
                return this.router.createUrlTree(['error/403']);
            }

            return true;
        })
    );
    }
}


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