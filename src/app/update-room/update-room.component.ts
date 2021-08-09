import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {
  
  id:number;
  room:Room;
  submitted=false;


  constructor( private route: ActivatedRoute, private router: Router,
    private roomsService: RoomsService) { }

  ngOnInit(){
    this.room = new Room();
    this.id = this.route.snapshot.params['id'];
    this.roomsService.getRoom(this.id)
    .subscribe(data=>{
      console.log(data);
      this.room = data;
    },
    error => console.log(error)
    );

  }
  updateRoom(){
    this.roomsService.updateRoom(this.id, this.room)
    .subscribe(data=> console.log(data),
     error => console.log(error));
     this.room = new Room();
     this.goToList();
  }
  onSubmit(){
    this.updateRoom();
  }
  goToList(){
    this.router.navigate(['/rooms']);
  }

}
