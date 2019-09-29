import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// npm install @types/socket.io-client
import {Router} from '@angular/router'; 
import { Observable } from 'rxjs';
// no working import { Observable } from 'rxjs/Observable'

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  allrooms: string[] = [];
  joinedrooms: string[] = [];
  currentroom: string;

  constructor(private router: Router) {
      this.socket = io(this.url);
      this.socket.emit('test', 'hello world');
      // for test
  }

  public reqRoomList() {
    this.socket.emit('roomlist', 'Room List Please');
    // this.socket.on('roomlist', (m) => { this.allrooms = JSON.parse(m); this.router.navigateByUrl('rooms'); });
  }


// request join a room
  public reqJoin(roomid) {
    this.socket.emit('room', roomid);
     this.joinedrooms.push(roomid);
     this.currentroom = roomid;
  }

  public getRoomlist = () => {
    return Observable.create((observer) => {
        this.socket.on('roomlist', (message) => {
            observer.next(message);
        });
    });
  }

  public sendRoomImage(m) {
    this.socket.emit('new-room-image', m);
    console.log('new-room-image sent service');
  }

  public getRoomImages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-room-image', (m) => {
            observer.next(m);
        });
    });
  }


  public sendRoomMessage(m) {
    this.socket.emit('new-room-message', m);
    console.log('new-room-message:' + m);
  }

  public getRoomMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-room-message', (m) => {
            observer.next(m);
        });
    });
  }

  public getInitMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('init-message', (m) => {
            observer.next(m);
        });
    });
  }
}
