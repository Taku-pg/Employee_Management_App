import { ValidatorFn, ValidationErrors } from "@angular/forms";


export const PasswordMismatchValidator: ValidatorFn = (group): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password !== confirmPassword ? { passwordMismatch: true } : null;
}