import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() navToggle: EventEmitter<boolean> = new EventEmitter();

  principal: User;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('principal')) {
      this.principal = JSON.parse(sessionStorage.getItem('principal') || '');
    }
  }

  navOpen() {
    this.navToggle.emit(true);
  }

  isAdmin(): boolean {
    if (this.principal && this.principal.roles) {
      return this.authService.isAuthenticated() &&
      (this.principal.roles.filter(role => role.name === 'ROLE_ADMIN').length !== 0);
    }
    return false
  }

}
