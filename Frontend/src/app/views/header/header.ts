import { Component, inject, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatMenuModule, TranslatePipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  translateService=inject(TranslateService);
  authService = inject(AuthService);
  router = inject(Router);
  role=signal<string|null>(null);

  onChangeLang(lang: 'ja'|'en'){
    this.translateService.use(lang);
  }

  ngOnInit(){
    this.router.events.subscribe(e=>{
      if(e instanceof NavigationEnd){
        this.role.set(this.authService.getRole());
      }
    })
  }

  onDisplayPersonalInfo(){
    this.router.navigateByUrl("/emp");
  }

  onLogout(){
    this.authService.logout();
  }
  
}
