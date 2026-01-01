import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  translateService=inject(TranslateService);

  onChangeLang(lang: 'ja'|'en'){
    this.translateService.use(lang);
  }
}
