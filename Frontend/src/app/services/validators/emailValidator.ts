import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { catchError, map, of } from "rxjs";
import { ApiService } from "../api.service";

export function uniqueEmailValidator(apiService: ApiService): AsyncValidatorFn{
    return (control: AbstractControl)=>{
        if(!control.value){
            return of(null);
        }
        console.log(control.value);
        return apiService.checkUniqueEmail(control.value).pipe(
            map(isUnique=>isUnique ? null:{isUniqueEmail: true}),
            catchError(()=>of(null))
        )
    } 
} 
