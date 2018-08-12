import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {ChatService} from '../chat.service'
import { AuthService,FacebookLoginProvider,GoogleLoginProvider } from 'angular-6-social-login-v2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private socialAuthService: AuthService, private route: Router,private chatRoomService:ChatService ) {}
  
//social login match and authentication
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // this.chatRoomService.getEmail(userData.email);
        localStorage.setItem("email", userData.email);
        this.route.navigate(['/chat-room']);    
      }
    );
  }
  

}
