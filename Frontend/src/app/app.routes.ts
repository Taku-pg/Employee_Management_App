import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Emp } from './views/emp/emp';
import { Admin } from './views/admin/admin';
import { Manager } from './views/manager/manager';

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
        path:'emp/:id',
        component: Emp
    },
    {
        path:'manager/:dept',
        component: Manager
    },
    {
        path:'admin',
        component: Admin
    }
];
