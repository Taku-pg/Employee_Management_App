import { Component, inject, input, OnInit, computed, signal, effect, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
  availableLanguages: string[] = [];
  languageLevels: string[] = [];
  originalLanguageLength = 0;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
  })

  // constructor(){
  //   effect(()=>{
  //     //const id=this.empId();
  //     this.apiService.getEmpDetail(this.empId).subscribe({
  //       next:(res)=>{
  //         this.emp.set(res);
  //         console.log(res.languages);
  //         this.setLanguagesToForm(res.languages);
  //       }
  //     });
  //   });
  // }

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
        this.currentEmp.set({...res});
         this.updateEmpForm.patchValue(res,{emitEvent: false});
        console.log(res.languages);
        this.setLanguagesToForm(res.languages);
        this.setDeptToForm(res.department);
      }
    });

    this.updateEmpForm.valueChanges.subscribe(emp=>{
      // const updateModel: UpdateEmpModel={};

      // if(emp.firstname)updateModel.firstname=emp.firstname;
      // if(emp.lastname)updateModel.lastname=emp.lastname;
      // if(emp.email)updateModel.email=emp.email;
      // if(emp.salary)updateModel.salary=emp.salary;
      // if(emp.dept)updateModel.department=emp.dept;
      // if(emp.selectedLanguages)updateModel.languages=emp.selectedLanguages as Language[];

      const value=this.updateEmpForm.getRawValue();

      this.currentEmp.set({
        firstname: value.firstname!,
        lastname: value.lastname!,
        email: value.email!,
        salary: value.salary!,
        department: value.dept!,
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
        const salaryControl = this.updateEmpForm.get('salary');
        salaryControl?.setValidators([Validators.required, Validators.min(res)]);
        salaryControl?.updateValueAndValidity();
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
      , uniqueEmailValidator(this.apiService)],
    salary: [0, [Validators.required, Validators.min(this.minSalary)]],
    dept: ['', Validators.required],
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
          language_name: [{ value: lang.language_name, disabled: true }],
          language_level: [{ value: lang.language_level, disabled: false }]
        })
      )
    })
    this.originalLanguageLength = this.selectedLanguages.length;
  }

  setDeptToForm(dept: string) {
    this.updateEmpForm.get('dept')?.setValue(dept);
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

  get dept() {
    return this, this.updateEmpForm.get('dept')?.value;
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

  onUpdate() {
    const patchData=this.patchEmp();
    if(Object.keys(patchData).length===0){
      return;
    }

    console.log(patchData);

    this.apiService.patchEmp(this.empId,patchData).subscribe({
      next:()=>this.router.navigate(['manager']),
      error:(err)=>{
        if(err.status===400 && err.error?.errors){
          console.log(err);
        }else{
          this.router.navigate(['error/500']);
        }
      }
    })

  }

  onDelete() {
    //delete entire employee
  }

  onDeleteNationality() {
    //delete this nationality
  }
}
