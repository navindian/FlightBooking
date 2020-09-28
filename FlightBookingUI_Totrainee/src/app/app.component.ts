import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  bookOptionSelected: boolean = false;
  agree: boolean = false;
  dable: boolean = false;

  constructor(private router: Router) { }
  agreed(value){
     if(value==1){
      this.router.navigate(["/book"])
     }
     if(value==2){
       this.router.navigate(["/view"])
     }
     if(value==3){
       this.router.navigate(["/verify"])
     }
   }
}