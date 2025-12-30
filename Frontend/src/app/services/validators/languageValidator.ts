import { FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";


export const duplicateLanguageValidator: ValidatorFn = (control): ValidationErrors | null => {
  const formArray = control as FormArray;
  if (!formArray) return null;
  const values = formArray.controls.map(ctrl => ctrl.get('language_name')?.value);

  const duplicate = new Set(values).size !== values.length;
  return duplicate ? { duplicate: true } : null;
}