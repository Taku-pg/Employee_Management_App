import { Component, inject, input, OnInit, computed, signal, effect, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeModel, Language } from '../../models/emp.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { uniqueEmailValidator } from '../../services/validators/emailValidator';
import { duplicateLanguageValidator } from '../../services/validators/languageValidator';
import { UpdateEmpModel } from '../../models/updateEmp.model';

function setPatch<K extends keyof UpdateEmpModel>(patch: Partial<UpdateEmpModel>, key: K, value: UpdateEmpModel[K]){
  patch[key]=value;
}

@Component({
  selector: 'app-emp-detail',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './emp-detail.html',
  styleUrl: './emp-detail.css',
})

export class EmpDetail implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  empId: string = '';
  depts: string[] = [];
  minSalary = 0;
  originalEmp = signal<EmployeeModel | null>(null);
  currentEmp=signal<Partial<UpdateEmpModel>>({});
  originalEmail='';
  availableLanguages: string[] = [];
  languageLevels: string[] = [];
  originalLanguageLength = 0;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  deleteErrMsg=signal<string>('');

  patchEmp=computed(()=>{
    const original=this.originalEmp();
    const current=this.currentEmp();
 
    if(!original)return {};

    const patchData: Partial<UpdateEmpModel>={};

    (Object.keys(current) as (keyof UpdateEmpModel)[])
    .forEach(key => {
      if(key==='languages'){
        (current[key] as Language[]).forEach(crrLang=>{
          if(original[key].some(
            orgLang=>orgLang.language_name!==crrLang.language_name || 
            orgLang.language_level!==crrLang.language_level)){
              setPatch(patchData,key,current[key]);
            }
        }) 
      }
      else if(current[key]!==original[key]){
        setPatch(patchData,key,current[key]);
      }
    });
    return patchData;
  });

  ngOnInit() {
    this.apiService.getAllLanguage().subscribe({
      next: (res) => this.availableLanguages = res,
      error: () => this.router.navigate(['error/500'])
    });
    this.apiService.getLanguageLevels().subscribe({
      next: (res) => this.languageLevels = res,
      error: () => this.router.navigate(['error/500'])
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        this.empId = params.get('id')!;
        console.log(this.empId);
      },
      error: () => this.router.navigate(['error/500'])
    });

    this.apiService.getEmpDetail(this.empId).subscribe({
      next: (res) => {
        this.originalEmp.set(res);
        //set copy
        this.currentEmp.set({...res});
        this.updateEmpForm.patchValue(res,{emitEvent: false});

        //set value to form
        this.setLanguagesToForm(res.languages);
        this.setDeptToForm(res.department);

        //set validator to email
        this.originalEmail=res.email;
        this.setEmailValidator(res.email);
      },
      error:(err)=>{
        if(err.status===403){
          this.router.navigate(['error/403']);
        }else{
          this.router.navigate(['error/500']);
        }
      }
    });

    this.updateEmpForm.valueChanges.subscribe(emp=>{

      const value=this.updateEmpForm.getRawValue();

      this.currentEmp.set({
        firstname: value.firstname!,
        lastname: value.lastname!,
        email: value.email!,
        salary: value.salary!,
        department: value.department!,
        languages: value.selectedLanguages as Language[],
      });
    })

    this.apiService.getAllDept().subscribe({
      next: (res) => {
        this.depts = res;
        console.log(res);
      },
      error: () => this.router.navigate(['error/500'])
    });

    this.apiService.getMinSalary().subscribe({
      next: (res) => {
        this.minSalary = res;
        this.setSalaryValidator(res);
        console.log(res);
        console.log(this.minSalary);
      },
      error: () => this.router.navigate(['error/500'])
    });
  }

  updateEmpForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailRegex)]
      , uniqueEmailValidator(this.apiService,this.originalEmail)],
    salary: [0, [Validators.required, Validators.min(this.minSalary)]],
    department: ['', Validators.required],
    selectedLanguages: this.fb.array([], { validators: duplicateLanguageValidator })
  });

  createLanguageControl() {
    return this.fb.group({
      language_name: ['', Validators.required],
      language_level: ['', Validators.required]
    })
  }

  get selectedLanguages(): FormArray {
    return this.updateEmpForm.get('selectedLanguages') as FormArray;
  }

  setLanguagesToForm(data: any[]) {
    data.forEach((lang: any) => {
      this.selectedLanguages.push(
        this.fb.group({
          language_name: [{ value: lang.language_name, disabled: true }, Validators.required],
          language_level: [{ value: lang.language_level, disabled: false }, Validators.required]
        })
      )
    })
    this.originalLanguageLength = this.selectedLanguages.length;
  }

  setDeptToForm(dept: string) {
    this.updateEmpForm.get('department')!.setValue(dept);
  }

  setEmailValidator(original: string){
    const control =this.updateEmpForm.get('email');
    control?.setValidators([Validators.required, Validators.pattern(this.emailRegex)])
    control?.setAsyncValidators(uniqueEmailValidator(this.apiService,original))
    control?.updateValueAndValidity();
  }

  setSalaryValidator(minSal: number){
    const salaryControl = this.updateEmpForm.get('salary');
    salaryControl?.setValidators([Validators.required, Validators.min(minSal)]);
    salaryControl?.updateValueAndValidity();
  }

  get firstname() {
    return this.updateEmpForm.get('firstname');
  }

  get lastname() {
    return this.updateEmpForm.get('lastname');
  }

  get email() {
    return this.updateEmpForm.get('email');
  }

  get salary() {
    return this.updateEmpForm.get('salary');
  }

  get department() {
    return this.updateEmpForm.get('department');
  }

  isSelectedLanguage(language: string, current: number) {
    return this.selectedLanguages.controls.some((ctrl, index) => {
      if (current === index) return false;
      return ctrl.get('language_name')?.value === language;
    })
  }

  isSelectedAll(): boolean {
    return this.availableLanguages.length === this.selectedLanguages.length;
  }

  isSelectedLanguageLevel(languageLevel: string, index: number) {
    const group = this.selectedLanguages.at(index) as FormGroup;
    if (!group) return false;
    const level = group.get('language_level')?.value;
    return level === languageLevel;
  }

  isValidLanguageForm() {
    return this.selectedLanguages.valid;
  }

  onRemoveSelectedLanguage(index: number) {
    console.log(index);
    this.selectedLanguages.removeAt(index);
  }

  onAddSelectedLanguage() {
    this.selectedLanguages.push(this.createLanguageControl());
  }

  setServerError(errors: Record<string, any>){
    Object.keys(errors).forEach(key=>{
      console.log(key);
      const control=this.updateEmpForm.get(key);
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

  onUpdate() {
    if(this.updateEmpForm.invalid){
      this.updateEmpForm.markAllAsTouched();
      return;
    }
    const patchData=this.patchEmp();
    if(Object.keys(patchData).length===0){
      return;
    }

    console.log(patchData);

    this.apiService.patchEmp(this.empId,patchData).subscribe({
      next:()=>this.router.navigate(['manager']),
      error:(err)=>{
        if(err.status===400 && err.error?.errors){
          this.setServerError(err.error?.errors);
        }else{
          this.router.navigate(['error/500']);
        }
      }
    })

  }

  onDelete() {
    this.apiService.deleteEmp(this.empId).subscribe({
      next:()=>this.router.navigate(['manager']),
      error:(err)=>{
        if(err.status===400){
          console.log(err);
          this.deleteErrMsg.set(err.error.message);
        }else{
          this.router.navigate(['error/500']);
        }
      }   
    })
  }
}
