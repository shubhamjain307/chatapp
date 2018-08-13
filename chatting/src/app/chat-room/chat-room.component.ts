import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';
import {Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  channel:string="";
  foundChannel="";
  channelArray:any=[];
  foundChannelId="";
  channelLen;
  newChannel:string;
  myMsg:string;
  allMsg=[];
  allChannels=[];

  constructor(private chatService:ChatService,private route:Router) { }
  
  //creates service
  createService(){
        this.chatService.setJson().subscribe(res=>{
          console.log(res)
        },
        err=>{
          console.log(err);
        });
  }

//finds the existing channels in the database
  findChannel(){
    this.chatService.findChannel().subscribe(res=>{
      //console.log("RES value"+(res.channels[0].unique_name));
      console.log("len"+res.channels.length);
      for(let channelIndex=0;channelIndex<res.channels.length;channelIndex++){
          //console.log("array "+(res.channels[channelIndex].sid));     
          this.channelArray.push(res.channels[channelIndex].unique_name)
          // console.log("channel array: "+ this.channelArray);
          // console.log("channel name: "+this.channel);
          this.channelLen=this.channelArray.length;  

      for(let index=0;index<this.channelLen;index++){
        if(this.channelArray[index]==this.channel)
        {
          //console.log("channel found");
          this.foundChannel=this.channel;
          this.foundChannelId=res.channels[index].sid;
          break;
        }
        else{
        //console.log("not found");
        this.foundChannel="channel not found";
        }
      }
    }
    },
  err=>{
    console.log();
  })
  }

//creates new channel
  createChannel(){
    console.log("New Channel: "+this.newChannel);
    this.chatService.createChannel(this.newChannel).subscribe(res=>{
      console.log("Channel Id "+JSON.stringify(res.sid));
    }, 
  err=>{
    console.log(err);
  });
  }

//sends messages to the channel using channel id
  sendMsg(){
    this.chatService.sendMsg(this.myMsg).subscribe(res=>{
      console.log(res);
     // this.getAllMsg();
    },
  err=>{
    console.log(err);
  });
  
  }

//renders all the messages on the HTML
  getAllMsg(){
    setInterval(() => {this.chatService.getAllMsg().subscribe(res=>{
      this.allMsg.length = 0;
      let len = res.messages.length;
      for (let i=0;i<len;i++){
      this.allMsg.push(res.messages[i].body +' (' +res.messages[i].from+')');
      }
      console.log(res.messages);
    },
  err=>{
    console.log(err);
  })},1000)
  }

  ngOnInit() {
    this.getAllMsg();
    
//shows list of all channels
    this.chatService.getAllChannels().subscribe((res)=>{
      for ( let i = 0; i < res.channels.length; i++){
        if(res.channels[i].unique_name != null)
        {
          this.allChannels.push(res.channels[i].unique_name);
        }
      }
    },
  err=>{
    console.log(err);
  })
  }
  logout(){
    let logout = confirm("Do you really want to logout?");
    if(logout){
      localStorage.clear();
      localStorage.clear();
      this.route.navigate(['/']);
    }else{
      return;
    }
  }
}