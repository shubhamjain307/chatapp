import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

//various id's for Twilio api authentication
  idChannel:string="CH8017938e93f541319c7067a7a1282081";
  idService:string="ISb83ef09bb5844db5be47385f3c99d641";
  email=localStorage.getItem("email");

//http header
  httpOpt={
   headers : new HttpHeaders({ 
    'Content-Type' :'application/x-www-form-urlencoded',
    "Authorization" : "Basic QUMzZThkMmY3MmQ4MjQ0Y2E0YWY4MjY4ZmFjOTEzZmI2NTo3MDQ1ZThlNjg3MjI4NDViYmVkZmNhOWVmYmRmOTEzOQ=="
  })}

  constructor(private http:HttpClient) { 

  }
  
//service api hit
  setJson():Observable<any>{
   
    return this.http.post("https://chat.twilio.com/v2/Services","FriendlyName=chatRoom",this.httpOpt);
  }

//new channel api hit  
  createChannel(newChannel):Observable<any>{
    
      return this.http.post("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels","FriendlyName=chatroom&UniqueName="+newChannel,this.httpOpt);
  }
 
//search channel api hit
  findChannel():Observable<any>{
    
    return  this.http.get("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels",this.httpOpt).pipe(map(data=>data)); 
  }
  
  // joinChannel(channelId):Observable<any>{
  //   return this.http.post("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels/"+channelId+"/Members","ChannelSid="+channelId+"&Identity="+this.email+"&ServiceSid="+this.idService,this.httpOpt); 
  // }

//message sending api hit
  sendMsg(myMsg):Observable<any>{
    return this.http.post("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels/"+this.idChannel+"/Messages","ChannelSid="+this.idChannel+"&ServiceSid="+this.idService+"&Body="+myMsg+"&From="+this.email,this.httpOpt); 
  }

//displaying all message's data in html
  getAllMsg():Observable<any>{
    return this.http.get("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels/"+this.idChannel+"/Messages",this.httpOpt).pipe(map(data=>data));
  }

//lists all the available channels  
  getAllChannels():Observable<any>{
    return this.http.get("https://chat.twilio.com/v2/Services/"+this.idService+"/Channels/",this.httpOpt);

  }
}