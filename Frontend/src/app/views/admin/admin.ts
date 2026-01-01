import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { type TableDataModel } from '../../models/tableData.model';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
  private apiService=inject(ApiService);
  private authService=inject(AuthService);
  private router=inject(Router);

  contents=signal<TableDataModel[]>([]);
  content=signal<TableDataModel|null>(null);
  currentPage=0;

  ngOnInit(){
    this.apiService.getAllInfo().subscribe({
      next:(res)=>{
        this.contents.set(res);
        this.setPageContent();
      }    
    })
  }

  setPageContent(){
    this.content.set(this.contents()[this.currentPage]);
  }

  getContent(page: number){
    return this.contents()[page];
  }

  onPrev(){
    if(this.currentPage>0){
      this.currentPage--;
      this.setPageContent();
    }
  }

  onNext(){
    if(this.currentPage<this.contents().length-1){
      this.currentPage++;
      this.setPageContent();
    }
  }

  onViewDetail(i: number){
    const tableName=this.content()?.table;
    if(!tableName)return;

    const id=this.content()?.data[i].id;
    if(!id)return;

    if(tableName==='employees'){
      return this.router.navigate([`/emp/${id}`]);
    }

    return this.router.navigate([`/${tableName}/${id}`]); 
  }

  onLogout(){
    this.authService.logout();
  }
}
