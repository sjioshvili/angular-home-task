import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public readonly productsPage: string = 'products';
  public readonly managersPage: string = 'managers';

  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService
  ) {}

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

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
