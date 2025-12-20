import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Emp } from './views/emp/emp';

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
    }
];
