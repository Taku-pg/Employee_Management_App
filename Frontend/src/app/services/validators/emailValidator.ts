import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { catchError, map, of } from "rxjs";
import { ApiService } from "../api.service";

export function uniqueEmailValidator(apiService: ApiService, originalEmail?: string): AsyncValidatorFn {

    return (control: AbstractControl) => {

        if (!control.value) {
            return of(null);
        }
        if (originalEmail) {
            if (originalEmail === control.value) {
                return of(null);
            }
        }

        return apiService.checkUniqueEmail(control.value).pipe(
            map(isUnique => isUnique ? null : { isUniqueEmail: true }),
            catchError(() => of(null))
        )
    }
} 
