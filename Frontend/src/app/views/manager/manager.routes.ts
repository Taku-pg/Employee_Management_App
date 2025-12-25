import { Routes } from "@angular/router";
import { Manager } from "./manager";
import { EmpDetail } from "../emp-detail/emp-detail";
import { NewEmp } from "../new-emp/new-emp";

export const MANAGER_ROUTE: Routes = [
    {
        path: '',
        component: Manager,
        children:[
            {
                path: 'emp/:id',
                component: EmpDetail
            }
        ]
    }
];