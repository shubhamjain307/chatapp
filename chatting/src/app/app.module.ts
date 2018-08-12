import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider } from "angular-6-social-login-v2";
import { Routes, RouterModule } from '@angular/router';
import { FourofourComponent } from './fourofour/fourofour.component';
export function getAuthServiceConfigs() {

//social login id Providers
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2086481178030707")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("71057685722-nm306p40r3j4dt2rreod3s08d7b747al.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

const routes: Routes = [
  {
  path : '',
  component : LoginComponent },
  {
    path : 'login',
    component : LoginComponent },
    {
      path : 'chat-room',
      component : ChatRoomComponent },
      { path: '**', 
    component: FourofourComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatRoomComponent,
    FourofourComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }