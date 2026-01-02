import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map } from "rxjs";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.getCurrentEmpRole().pipe(
        map(res => {
            const empRole = res.role;
            if (!empRole) {
                return router.createUrlTree(['login']);
            }

            const requireRole = route.data['role'] as string[];

            if (requireRole && !requireRole.includes(empRole)) {
                return router.createUrlTree(['error/403']);
            }

            return true;
        })
    );
}