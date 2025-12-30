import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LanguageModel } from '../../models/lang.model';

@Component({
  selector: 'app-lang-detail',
  imports: [RouterLink],
  templateUrl: './lang-detail.html',
  styleUrl: './lang-detail.css',
})
export class LangDetail {
  private apiSrvice = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  langId = '';
  lang = signal<LanguageModel | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => this.langId = params.get('id')!,
      error: () => this.router.navigate(['error/404'])
    })
    this.apiSrvice.getLangDetail(this.langId!).subscribe(res => {
      this.lang.set(res);
    })
  }
}
