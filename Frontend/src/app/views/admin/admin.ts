import { Component, inject, OnInit, signal } from '@angular/core';
import { SimpleEmployeeModel } from '../../models/simpleEmp.model';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { type TableDataModel } from '../../models/tableData.model';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
  private apiService=inject(ApiService);
  private authService=inject(AuthService);
  contents=signal<TableDataModel[]>([]);
  content=signal<TableDataModel|null>(null);
  currentPage=0;
  pageContent: Record<string,number>={};

  ngOnInit(){
    this.apiService.getAllInfo().subscribe({
      next:(res)=>{
        console.log(res);
        this.contents.set(res);
        //this.content.set(res[0]);
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

  onLogout(){
    this.authService.logout();
  }
}
