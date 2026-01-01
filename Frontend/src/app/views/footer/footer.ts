import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  authService=inject(AuthService);

  onLogout(){
    this.authService.logout();
  }
}
