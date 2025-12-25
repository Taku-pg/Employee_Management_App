import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-emp',
  imports: [FormsModule],
  templateUrl: './new-emp.html',
  styleUrl: './new-emp.css',
})
export class NewEmp {
  firstname='';
  lastname='';
  email='';
  salary=0;
  department='';
  depts=input.required<string[]>();

  onRegister(){

  }
}
