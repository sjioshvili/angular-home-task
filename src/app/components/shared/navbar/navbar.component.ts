import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public readonly productsPage: string = 'products';

  constructor(private authenticationService: AuthenticationService) {}

  loggedIn: boolean = false;

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    this.authenticationService.currentUser.subscribe((user) => {
      if (user) {
        this.loggedIn = true;
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.authenticationService.logout();
  }
}
