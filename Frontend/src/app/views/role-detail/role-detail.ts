import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleModel } from '../../models/role.model';

@Component({
  selector: 'app-role-detail',
  imports: [RouterLink],
  templateUrl: './role-detail.html',
  styleUrl: './role-detail.css',
})
export class RoleDetail implements OnInit{
  private apiSrvice=inject(ApiService);
  private route=inject(ActivatedRoute);
  private router=inject(Router);

  roleId='';
  role= signal<RoleModel|null>(null);

  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(params)=>this.roleId=params.get('id')!,
      error: ()=>this.router.navigate(['error/404'])
    })
    this.apiSrvice.getRoleDetail(this.roleId!).subscribe(res=>{
      this.role.set(res);
    })
  }
}
