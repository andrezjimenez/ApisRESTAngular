import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service'
import { Auth } from './models/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  constructor(
     private authService : AuthService,
     private UsersService : UsersService,
  ){  }


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.UsersService.create({
      name: 'Andres',
      email: 'andru456@hotmail.com',
      password: '123456'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  login(){
    this.authService.login('andru456@hotmail.com','123456')
    .subscribe(rta => {
      console.log(rta);
    })
  }

}
