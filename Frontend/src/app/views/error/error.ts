import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterLink],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class ErrorPage implements OnInit {
  title='';
  message='';
  activatedRouter=inject(ActivatedRoute);

  ngOnInit(){
    const errorCode =this.activatedRouter.snapshot.data['errorCode'];
    console.log(errorCode);

    switch(errorCode){
      case 401:
        this.title='401 unauthorized';
        this.message='Please login';
        break;
      case 403:
        this.title='403 forbidden';
        this.message='You do not have access privileges';
        break;
      case 404:
        this.title='404 not found';
        this.message='Page not found';
        break;
      case 500:
        this.title='500 internal server error';
        this.message='Server error occurred';
        break;
    }
  }
}
