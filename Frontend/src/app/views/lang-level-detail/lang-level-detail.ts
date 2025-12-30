import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LanguageLevelModel } from '../../models/langLevel.model';

@Component({
  selector: 'app-lang-level-detail',
  imports: [RouterLink],
  templateUrl: './lang-level-detail.html',
  styleUrl: './lang-level-detail.css',
})
export class LangLevelDetail {
  private apiSrvice=inject(ApiService);
  private route=inject(ActivatedRoute);
  private router=inject(Router);

  langLevelId='';
  langLevel= signal<LanguageLevelModel|null>(null);

  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(params)=>this.langLevelId=params.get('id')!,
      error: ()=>this.router.navigate(['error/404'])
    })
    this.apiSrvice.getLangLevelDetail(this.langLevelId!).subscribe(res=>{
      this.langLevel.set(res);
    })
  }
}
