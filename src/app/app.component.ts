import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
// for injecting ChatService in the component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Chatting Room';
  rooms: string[] = [];
  selectedRoom = '';
  firstRoomMessage: string;
  serRes = '';
  roomMessage: string;
  imageFile: any;
  roomMessages: string[] = [];
  roomImages: string[] = [];
  chatService: any;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }
  /*
  Uncaught ReferenceError: global is not defined
   resolved by angular/angular-cli#8160 (comment)
   add polyfills.ts:
   (window as any).global = window;
   */
  roomList() {
    this.chatService.reqRoomList();
    this.chatService.getRoomlist().subscribe((m: string) => {
    this.rooms = JSON.parse(m);
    });
  }

  onSelect(room): void {
    this.selectedRoom = room;
    // this.chatService.reqJoin(this.selectedRoom);
    }
  joinInRoom(): void {
    this.chatService.reqJoin(this.selectedRoom);
    this.serRes = 'waiting for response for room ' + this.selectedRoom ;  
  }
  
  sendRoomMessage() {
    this.chatService.sendRoomMessage(this.roomMessage);
    console.log('room-message:' + this.roomMessage);
    this.roomMessage = '';
  }


  imageSelected(files) {​
    if (files.length > 0) {​
         alert("imageSelected: " + files[0].name);​
     }​
    let fileReader = new FileReader();​
    ​        fileReader.readAsDataURL(files[0]);​
       fileReader.onload = e => {​
         let buf = fileReader.result;​
         this.chatService.sendRoomImage(buf);
        console.log('room-image sent:');
       };​
    ​}​


  ngOnInit() {
    this.chatService.getRoomMessages().subscribe((m: string) => {
      this.roomMessages.push(m);
    });

    this.chatService.getRoomImages().subscribe((m: string) => {
      this.roomImages.push(m);
    });

    this.chatService.getInitMessages().subscribe((m: string) => {
      this.firstRoomMessage = m;
      console.log(m);
    });
  }



}
