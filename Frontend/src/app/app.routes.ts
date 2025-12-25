import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Emp } from './views/emp/emp';
import { Admin } from './views/admin/admin';
import { Manager } from './views/manager/manager';
import { authGuard, AuthGuard } from './services/authGuard';
import { ErrorPage } from './views/error/error';

export const routes: Routes = [
    {
        //fix using pathmatch?
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path:'emp',
        component: Emp
    },
    {
        //[authguard]を設定,express側は実装済み
        path:'manager',
        canActivate: [authGuard],
        data: {role: 'manager'},
        component: Manager
    },
    {
        path:'admin',
        canActivate: [authGuard],
        data: {role: 'admin'},
        component: Admin
    },
    {
        path:'error/401',
        component: ErrorPage,
        data: {errorCode: 401}
    },
    {
        path:'error/403',
        component: ErrorPage,
        data: {errorCode: 403}
    },
    {
        path:'error/500',
        component: ErrorPage,
        data: {errorCode: 500}
    },
    {
        path:'**',
        component: ErrorPage,
        data: {errorCode: 404}
    }
];
