import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { duplicateLanguageValidator } from '../../services/validators/languageValidator';
import { type NewEmployeeModel } from '../../models/newEmp.model';
import { form } from '@angular/forms/signals';
import { uniqueEmailValidator } from '../../services/validators/emailValidator';

@Component({
  selector: 'app-new-emp',
  imports: [FormsModule, CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './new-emp.html',
  styleUrl: './new-emp.css',
})

export class NewEmp {
  private apiService=inject(ApiService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  private fb=inject(FormBuilder);
  
  availableLanguages=signal<string[]>([]);
  languageLevels=signal<string[]>([]);
  minSalary=0;
  emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  ngOnInit(){
    this.apiService.getAllLanguage().subscribe({
      next: (res)=>this.availableLanguages.set(res),
      error: ()=>this.router.navigate(['error/500'])
    });

    this.apiService.getLanguageLevels().subscribe({
      next: (res)=>this.languageLevels.set(res),
      error: ()=>this.router.navigate(['error/500'])
    });

    this.route.paramMap.subscribe({
      next:(params)=>{
        this.minSalary=Number(params.get('minSal'));
        const salaryControl=this.newEmpForm.get('salary');
        salaryControl?.setValidators([Validators.required,Validators.min(this.minSalary)]);
        salaryControl?.updateValueAndValidity();
        console.log(this.minSalary);
      },
      error:()=>this.router.navigate(['error/500'])
    })
  }

  newEmpForm=this.fb.group({
    firstname: ['',Validators.required],
    lastname: ['',Validators.required],
    email: ['',[Validators.required, Validators.pattern(this.emailRegex)]
    ,uniqueEmailValidator(this.apiService)],
    salary: [0, [Validators.required,Validators.min(0)]],
    selectedLanguages:this.fb.array([
      this.createLanguageControl()
    ], {validators: duplicateLanguageValidator})
  });

  get firstname(){
    return this.newEmpForm.get('firstname');
  }

  get lastname(){
    return this.newEmpForm.get('lastname');
  }

  get email(){
    return this.newEmpForm.get('email');
  }

  get salary(){
    return this.newEmpForm.get('salary');
  }

  createLanguageControl(){
    return this.fb.group({
      language_name: this.fb.control(null, Validators.required),
      language_level: this.fb.control(null, Validators.required)
    });
  }

  get selectedLanguages(): FormArray{
    return this.newEmpForm.get('selectedLanguages') as FormArray;
  }

  addSelectedLanguage(){
    this.selectedLanguages.push(this.createLanguageControl());
    //console.log(this.selectedLanguages);
    console.log(this.availableLanguages().length);
    console.log(this.selectedLanguages.length);
  }

  removeSelectedLanguage(index: number){
    console.log(index);
    this.selectedLanguages.removeAt(index);
  }

  isSelectedLanguage(language: string, current: number): boolean{
    return this.selectedLanguages.controls.some((ctrl,index)=>{
      if(current===index)return false;
      return ctrl.get('language_name')?.value===language;
    })
  }

  isSelectedAll(): boolean{
    return  this.availableLanguages().length === this.selectedLanguages.length;
  }

  isValidLanguageForm(){
    return this.selectedLanguages.valid;
  }

  setServerError(errors: Record<string, any>){
    Object.keys(errors).forEach(key=>{
      console.log(key);
      const control=this.newEmpForm.get(key);
      console.log(control);
      if(control){
        if(control instanceof FormArray){
          this.setLanguageServerError(errors[key]);
        }else{
          control.setErrors({
            serverValidationError: errors[key]
          });
        }
        
        control.markAsTouched();
      }
    })
  }

  setLanguageServerError(errors: any[]){
    errors.forEach((item,index)=>{
      const group=this.selectedLanguages.at(index) as FormGroup;
      if(!group)return;

      Object.keys(item).forEach(key=>{
        const control=group.get(key);
        if(control){
          control.setErrors({
            serverValidationError: item[key]
          })
        }
      })
    })
  }

  onRegister(){
    if(this.newEmpForm.invalid){
      this.newEmpForm.markAllAsTouched();
      return;
    }

    const formValue=this.newEmpForm.value;

    const newEmp: NewEmployeeModel={
      firstname: formValue.firstname!,
      lastname: formValue.lastname!,
      email: formValue.email!,
      salary: formValue.salary!,
      languages: formValue.selectedLanguages!
      //.filter((l:any)=>l.language_name && l.language_name)
      .map((l:any)=>({
        language_name: l.language_name,
        language_level: l.language_level
      }))
    };

    this.apiService.createEmployee(newEmp).subscribe({
      next:()=>
        this.router.navigate(['manager']),
      error:(err)=>{
        if(err.status===400 && err.error?.errors){
          this.setServerError(err.error.errors);
        }else{
          this.router.navigate(['error/500']);
        }
      }
    })
  }

}
