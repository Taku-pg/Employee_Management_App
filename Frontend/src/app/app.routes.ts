import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Emp } from './views/emp/emp';
import { Admin } from './views/admin/admin';
import { Manager } from './views/manager/manager';
import { authGuard, AuthGuard } from './services/authGuard';
import { ErrorPage } from './views/error/error';
import { NewEmp } from './views/new-emp/new-emp';
import { EmpDetail } from './views/emp-detail/emp-detail';

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
        path:'emp/:id',
        canActivate: [authGuard],
        data: {role: 'manager'},
        component: EmpDetail
    },
    {
        path:'manager',
        canActivate: [authGuard],
        data: {role: 'manager'},
        component: Manager,
        //loadChildren: ()=> import('./views/manager/manager.routes').then(m=>m.MANAGER_ROUTE)
    },
    {
        path:'register/:minSal',
        canActivate: [authGuard],
        data: {role: 'manager'},
        component: NewEmp
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
