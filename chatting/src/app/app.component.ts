import { Component } from '@angular/core';
import {Routes,RouterModule,Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatting';
  constructor (private route:Router){
    this.route.navigate(['']);

}
}
