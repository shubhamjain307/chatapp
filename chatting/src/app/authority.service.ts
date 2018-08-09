import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import {HttpClientModule,HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthorityService {


  httpOpt = {
    headers: new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic QUMzZThkMmY3MmQ4MjQ0Y2E0YWY4MjY4ZmFjOTEzZmI2NTo3MDQ1ZThlNjg3MjI4NDViYmVkZmNhOWVmYmRmOTEzOQ==' 
      
    })
  }
   
 // serviceId:string="ISb83ef09bb5844db5be47385f3c99d641";
 // chennalList:any;
  //idChannel:string="CHff222371f35e4c8ebca8af335b15ba1b";
 // email:string="shubham.jain307.com";
  email=localStorage.getItem("email");                            
  idService:string="ISb83ef09bb5844db5be47385f3c99d641";  //service ID
  idChannel:string="CH8017938e93f541319c7067a7a1282081";   //Channel ID

  constructor(private http:HttpClient) { }
   
    
   


  setServer():Observable<any> 
  { 
    //creates a service with friendly name=shubham
    return this.http.post<any>('https://chat.twilio.com/v2/Services','FriendlyName=shubham1',this.httpOpt);
    
  }
 
  createChannel(newChannel):Observable<any>
  {
    //This creates a new channel in the service
    
    return this.http.post("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels","FriendlyName=chatroom&UniqueName="+newChannel,this.httpOpt);
}

findChannel():Observable<any>
{
  //This is used find channel in the service
    
  return  this.http.get("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels",this.httpOpt).pipe(map(data=>data)); 
}

 /* addRole():Observable<any>
  {
    // 
    return  this.http.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Roles","FriendlyName=shubham&Type=deployment&Permission=createChannel",this.httpOpt); 
  }
  */
 // myChannelId:string="CH2e8a3e90caf3440aa3bfa672a0d4a483"; //This is channel id
 // iduser:string="shubham.jain307@gmail.com";
  
  
  
 /*  joinChannel(channelId):Observable<any>
  {
     // this.myChannelId=channelId;
      //Function helps to join an existing channel

     return this.http.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+channelId+"/Members","ChannelSid="+channelId+"&Identity="+this.iduser+"&ServiceSid="+this.serviceId,this.httpOpt); 
  }
 */

 sendMsg(myMessage):Observable<any>
 {
   //This is used to send messages to the particular channel
  return this.http.post("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels/"+this.idChannel+"/Messages","ChannelSid="+this.idChannel+"&ServiceSid="+this.idService+"&Body="+myMessage+"&From="+this.email,this.httpOpt); 
}


   getAllMsg():Observable<any>
   {
     //this is used to get the messages from the channel
    return this.http.get("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels/"+this.idChannel+"/Messages",this.httpOpt).pipe(map(data=>data));
  }
    
}
