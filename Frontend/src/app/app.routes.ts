import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Emp } from './views/emp/emp';
import { Admin } from './views/admin/admin';
import { Manager } from './views/manager/manager';
import { authGuard } from './services/authGuard';
import { ErrorPage } from './views/error/error';
import { NewEmp } from './views/new-emp/new-emp';
import { EmpDetail } from './views/emp-detail/emp-detail';
import { DeptDetail } from './views/dept-detail/dept-detail';
import { RoleDetail } from './views/role-detail/role-detail';
import { LangDetail } from './views/lang-detail/lang-detail';
import { LangLevelDetail } from './views/lang-level-detail/lang-level-detail';

export const routes: Routes = [
    {
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
        data: {role: ['manager','admin']},
        component: EmpDetail
    },
    {
        path:'manager',
        canActivate: [authGuard],
        data: {role: ['manager']},
        component: Manager,
        //loadChildren: ()=> import('./views/manager/manager.routes').then(m=>m.MANAGER_ROUTE)
    },
    {
        path:'register/:minSal',
        canActivate: [authGuard],
        data: {role: ['manager']},
        component: NewEmp
    },
    {
        path:'admin',
        canActivate: [authGuard],
        data: {role: ['admin']},
        component: Admin
    },
    {
        path:'department/:id',
        canActivate: [authGuard],
        data: {role: ['admin']},
        component: DeptDetail
    },
    {
        path:'role/:id',
        canActivate: [authGuard],
        data: {role: ['admin']},
        component: RoleDetail
    },
    {
        path:'language/:id',
        canActivate: [authGuard],
        data: {role: ['admin']},
        component: LangDetail
    },
    {
        path:'language_level/:id',
        canActivate: [authGuard],
        data: {role: ['admin']},
        component: LangLevelDetail
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
        data: {errorCode: 404, hideFooter: true}
    }
];
