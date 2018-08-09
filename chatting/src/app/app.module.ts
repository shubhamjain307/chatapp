import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {Routes,RouterModule,Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { GroupchatComponent } from './groupchat/groupchat.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'groupchat', component: GroupchatComponent },  //Routing Paths

 /*  { path: 'showdetail', component: ShowdetailComponent},
  { path: 'editdetail', component:EditComponent }
 */
];

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2086481178030707")  //Facebook unique id
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,    //Google unique id
          provider: new GoogleLoginProvider("71057685722-nm306p40r3j4dt2rreod3s08d7b747al.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupchatComponent
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
