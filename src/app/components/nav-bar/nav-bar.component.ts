import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  protected name?: string;
  constructor(protected readonly userService: UserService) {}

  protected signOut() {
    this.userService.logout();
  }
}
