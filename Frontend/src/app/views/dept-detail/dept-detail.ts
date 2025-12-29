import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { type DeptModel } from '../../models/dept.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dept-detail',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './dept-detail.html',
  styleUrl: './dept-detail.css',
})
export class DeptDetail implements OnInit{
  private apiService=inject(ApiService);
  private route=inject(ActivatedRoute);
  private router=inject(Router);
  private fb=inject(FormBuilder);

  deptId='';
  originalManagerId='';
  dept=signal<DeptModel|null>(null);

  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(params)=>{
        this.deptId=params.get('id')!;
      }
    })

    this.apiService.getDeptDetail(this.deptId).subscribe(res=>{
      this.dept.set(res);
      console.log(res);
      this.managerSelectForm.get('managerId')?.setValue(res.managerId);
      this.originalManagerId=res.managerId;
    })
  }

  managerSelectForm=this.fb.group({
    managerId:['', Validators.required]
  })

  get managerId(){
    return this.managerSelectForm.get('managerId');
  }

  onChangeManager(){
    if(this.managerSelectForm.invalid){
      this.managerSelectForm.markAllAsTouched();
      return;
    }
    const managerId=this.managerSelectForm.get('managerId')?.value;
    if(!managerId || managerId===this.originalManagerId){
      return;
    }

    this.apiService.changeManager(this.deptId, this.originalManagerId, managerId).subscribe(res=>{
      this.router.navigate(['admin']);
    })
  }
}
