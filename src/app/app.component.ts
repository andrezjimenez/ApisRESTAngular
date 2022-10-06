import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service'
import { Auth } from './models/auth.model';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  token = '';

  constructor(
     private authService : AuthService,
     private usersService : UsersService,
  ){  }


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      name: 'Andres',
      email: '1@hotmail.com',
      password: '123456'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  login(){
    this.authService.login('1@hotmail.com','123456')
    .subscribe(rta => {
      console.log(rta);
      this.token = rta.access_token;
      console.log(this.token);
    });
  }

  getProfile(){
    this.authService.profile(this.token)
    .subscribe(profile =>{
      console.log(profile);
    })
  }
  getProfile2(){
    this.authService.getProfile(this.token)
    .subscribe(profile =>{
    console.log(profile);
  })
}
}
