import { Component } from '@angular/core';
import { User, UserRole } from 'src/app/entities/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  public listUsers?: User[];
  protected listFiltered?: User[];
  protected userOption?: UserRole;
  protected selectedUser?: User;
  protected showCreateUsers?: boolean;
  protected showTable: boolean;
  protected listChoseOption?: UserRole;
  protected showHistory: boolean;

  constructor(protected readonly userService: UserService) {
    this.setListOfUsers();
    this.listUsers = this.userService.users;
    this.showTable = true;
    this.showHistory = false;
  }


  protected async chooseListOption(option: UserRole) {
    this.userOption = option;
    this.listFiltered = this.userService.users?.filter((u) => u.userRole === option);
    this.showTable = !this.showTable;
    this.listChoseOption = option;
  }


  protected async setListOfUsers() {
    await this.userService.getUsers();
  }

  protected activateCreateUsers() {
    this.showCreateUsers = true;
  }

  protected return() {
    this.showCreateUsers = false;
  }

  protected handlerUpdateView(showTable: boolean) {
    this.showTable = showTable;
  }

  protected handleSelectUser(dato:any){
    this.selectedUser = dato;
    this.showHistory = true;
  }

  protected returnFromHistory(){
    this.showHistory = false;
  }

  protected downloadUsersAsExcel(){
    this.userService.exportUsersToXls(this.userService.users, "usuarios");
  }


}
