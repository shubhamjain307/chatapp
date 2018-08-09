import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.component.html',
  styleUrls: ['./groupchat.component.css']
})
export class GroupchatComponent implements OnInit {

  constructor(private auth:AuthorityService) { }


  setData(){


  this.auth.setServer().subscribe(res=>{  //Used for setting up the services

    console.log(res);   
  })

  }

  channel:string="";
  foundChannel="";
  channelArray:any=[];
  foundChannelId="";
  channelLen;
  newChannel:string;
  myMsg:string;
  allMsg=[];
  findChannel(){
    this.auth.findChannel().subscribe(res=>{

        //Function for finding channels
      //console.log("RES value"+(res.channels[0].unique_name));
      console.log("len"+res.channels.length);
      for(let channelIndex=0;channelIndex<res.channels.length;channelIndex++){
          //console.log("array "+(res.channels[channelIndex].sid));     
          this.channelArray.push(res.channels[channelIndex].unique_name)
          // console.log("channel array: "+ this.channelArray);
          // console.log("channel name: "+this.channel);
          this.channelLen=this.channelArray.length;  
                                                   
      for(let index=0;index<this.channelLen;index++){   //For each can't be used on res
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

  createChannel(){   //Function for creating channel
    console.log("New Channel: "+this.newChannel);
    this.auth.createChannel(this.newChannel).subscribe(res=>{
      console.log("Channel Id "+JSON.stringify(res.sid));
    }, 
  err=>{
    console.log(err);
  });
  }
 /*  joinChannel(){
      //The channel can be joined by using channelid in the search bar
    console.log(this.foundChannelId);
    this.auth.joinChannel(this.foundChannelId).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  } */
  /* addRole(){
    this.auth.setServer().subscribe(res=>{
      console.log(res);
    },
  err=>{
      console.log(err);
  })
  } */
 
  sendMsg(){
      //This function is used to send message to particular services

    this.auth.sendMsg(this.myMsg).subscribe(res=>{
     // console.log(res);
    },
  err=>{
    console.log(err);
  });
  setTimeout(
    function(){   //used for reloading the page in 1 sec
      location.reload();
    },1000);
  }
  getAllMsg(){
    //This function is used to get all messages from channel
    this.auth.getAllMsg().subscribe(res=>{
      let len = res.messages.length;
      for (let i=0;i<len;i++){
      this.allMsg.push(res.messages[i].body +' ( ' +res.messages[i].from+' ) ');
      console.log(this.allMsg);
      }
    },
  err=>{
    console.log(err);
  })
  }

  ngOnInit() {
   
    this.getAllMsg(); //First function to be called

  }

}
