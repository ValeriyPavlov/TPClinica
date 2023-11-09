import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/entities/User';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  protected userForQuickAccess?: User[];
  protected formLogin: FormGroup;

  constructor(private readonly alertService: AlertService, protected readonly userService: UserService, private readonly router: Router, private readonly formBuilder: FormBuilder, public sService: NgxSpinnerService) {

    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  public async loginWithMailAndPassword() {
    try {
      this.sService.show();
      const userLog = await this.userService.loginWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.password);
      this.sService.hide();
      await this.alertService.showAlert({icon: 'success', message: `Bienvenido ${userLog?.name} ${userLog?.lastName}`, timer: 2000});
      await this.router.navigateByUrl('/bienvenida');
    } 
    catch (error: any) {
      await this.userService.logout();
      this.sService.hide();
      await this.alertService.showAlert({icon: 'error', message: error.message, timer: 2000});
    }
    this.sService.hide();
    this.formLogin.reset();
  }

  protected autolog(userType: string){
    switch(userType){
      case "admin":
        this.formLogin.setValue({ email: "admin@clinicaonline.com.ar", password: "testtest"});
        break;
      case "paciente":
        this.formLogin.setValue({ email: "paciente@sfolkar.com", password: "testtest"});
        break;
      case "especialista":
        this.formLogin.setValue({ email: "especialista@myinfoinc.com", password: "testtest"});
        break;
    }
  }
  
}
