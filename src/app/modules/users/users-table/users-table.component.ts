import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserRole } from 'src/app/entities/User';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  
  @Input() public list?: User[];
  @Input() public roleOption?: UserRole;
  @Output() public eventSendUser: EventEmitter<User>;
  @Output() public eventShowTable: EventEmitter<boolean>;
  @Input() public showTable: boolean;

  constructor(protected readonly userService: UserService, private readonly alertService: AlertService, public sService: NgxSpinnerService) {
    this.eventSendUser = new EventEmitter();
    this.eventShowTable = new EventEmitter();
    this.showTable = true;
  }

  protected return() {
    this.showTable = !this.showTable;
    this.eventShowTable.emit(this.showTable);
  }

  protected async validateSpecialist(user: User) {
    try {
      this.sService.show();
      const result = await this.userService.authorizeSpecialistByAdmin(user);
      this.sService.hide();
      if (result) {
        await this.alertService.showAlert({icon: 'success', message: 'Especialista habilitado con exito', timer: 2000});
      }
      else
      {
        await this.alertService.showAlert({icon: 'success', message: 'Especialista inhabilitado con exito', timer: 2000});
      }
    } 
    catch (error: any) {
      await this.alertService.showAlert({icon: 'error', message: error.message, timer: 2000});
    }
  }
}
