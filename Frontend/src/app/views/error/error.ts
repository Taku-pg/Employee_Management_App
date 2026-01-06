import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-error',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class ErrorPage implements OnInit {
  title='';
  message='';
  code='';
  activatedRouter=inject(ActivatedRoute);

  ngOnInit(){
    const errorCode =this.activatedRouter.snapshot.data['errorCode'];

    switch(errorCode){
      case 401:
        this.code='401';
        this.title='401 unauthorized';
        this.message='Please login';
        break;
      case 403:
        this.code='403';
        this.title='403 forbidden';
        this.message='You do not have access privileges';
        break;
      case 404:
        this.code='404';
        this.title='404 not found';
        this.message='Page not found';
        break;
      case 500:
        this.code='500';
        this.title='500 internal server error';
        this.message='Server error occurred';
        break;
    }
  }
}
