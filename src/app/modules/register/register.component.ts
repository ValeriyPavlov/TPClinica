import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/entities/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  protected showForm: boolean;
  protected registerChosenOption?: UserRole;

  constructor(protected readonly userService: UserService) {
    this.showForm = true;
  }

  ngOnInit(): void {}
  

  protected chooseRegistrationOption(option: UserRole) {
    this.showForm = !this.showForm;
    this.registerChosenOption = option;
  }

  
  protected handlerUpdateView($event: any) {
    this.showForm = $event as boolean;
  }
}
