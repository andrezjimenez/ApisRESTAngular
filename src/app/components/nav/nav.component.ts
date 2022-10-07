import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  email = '';

  constructor(
    private storeService: StoreService,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('1@hotmail.com','123456')
    .subscribe(rta => {
      console.log(rta);
      this.token = rta.access_token;
      console.log(this.token);
      this.getProfile();
    });
  }

  getProfile(){
    this.authService.profile(this.token)
    .subscribe(profile =>{
      console.log(profile);
      this.email=profile.email;
    })
  }

}
