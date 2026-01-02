import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Header } from './views/header/header';
import { Footer } from './views/footer/footer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Frontend');
  private translate=inject(TranslateService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  displayFooter=signal<boolean>(false);

  constructor(){
    this.translate.addLangs(['en','ja']);
    this.translate.use('en');
  }

  ngOnInit(){
    this.router.events.pipe(filter(e=>e instanceof NavigationEnd)).subscribe(()=>{
      const child=this.route.firstChild;
      const hideFooter=child?.snapshot.data['hideFooter'];
      if(this.router.url==='/login' || hideFooter){
        this.displayFooter.set(false);
      }else{
        this.displayFooter.set(true);
      }
    })
  }
}
