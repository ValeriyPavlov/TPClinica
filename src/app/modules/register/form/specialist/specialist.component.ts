import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Schedule } from 'src/app/entities/Schedule';
import { Especialista } from 'src/app/entities/Specialist';
import { Especialidad } from 'src/app/entities/Speciality';
import { AlertService } from 'src/app/services/alert.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.css']
})
export class SpecialistComponent {

  @Output() public eventShowForm: EventEmitter<boolean>;
  @Input() public showForm?: boolean;

  private profilesPhotos: any;
  protected formSpecialistRegister: FormGroup;
  protected listOfSpecialities?: Especialidad[];
  protected showOtherSpeciality?: boolean;
  protected selectedSpecialitys: string[] = [];

  constructor(private readonly userService: UserService, private readonly alertService: AlertService, private readonly formBuilder: FormBuilder,private readonly specialitiesService: SpecialityService, public sService: NgxSpinnerService) {
    this.setSpecialities();
    this.profilesPhotos = {};
    this.eventShowForm = new EventEmitter();
    this.formSpecialistRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(90)]],
      dni: ['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      speciality: ['', [Validators.required]],
      otherSpeciality: [''],
      email: ['', [Validators.required, Validators.email]],
      profilePhoto: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      recaptchaReactive: [null, Validators.required]
    });
  }


  protected async register() {
    try {
      if (this.formSpecialistRegister.valid) {
        this.sService.show();
        this.validateSpeciality();
        await this.uploadFiles();
        const user = this.createUser();
        await this.userService.registerWithFirebase(user);
        this.sService.hide();
        await this.alertService.showAlert({icon: 'success', message: `Registro completado con exito para ${user.name} ${user.lastName}!`, timer: 1500});
        this.formSpecialistRegister.reset();
      } 
      else {
        await this.alertService.showAlert({icon: 'error', message: 'Debe completar todos los campos', timer: 1500});
      }
    } catch (error: any) {
      await this.alertService.showAlert({icon: 'error', message: error.message, timer: 1500});
    }
    finally{
      this.sService.hide();
    }
  }

  protected addOtherSpec(){
    if(this.formSpecialistRegister.controls['otherSpeciality'].value != undefined && this.formSpecialistRegister.controls['otherSpeciality'].value != "" && !this.selectedSpecialitys.includes(this.formSpecialistRegister.controls['otherSpeciality'].value))
    {
      this.selectedSpecialitys.push(this.formSpecialistRegister.controls['otherSpeciality'].value);
    }
  }


  protected return() {
    this.showForm = !this.showForm;
    this.eventShowForm.emit(this.showForm);
  }


  protected selectOtherSpeciality() {
    this.showOtherSpeciality = !this.showOtherSpeciality;
  }

  protected selectSpeciality($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (input.checked) 
    {
      this.selectedSpecialitys.push(input.value);
    } 
    else 
    {
      const index = this.selectedSpecialitys.findIndex((d) => d === input.value);
      if (index > -1) 
      {
        this.selectedSpecialitys.splice(index, 1);
      }
    }
    console.log(this.selectedSpecialitys);
  }

  private validateSpeciality() {
    if (this.listOfSpecialities?.some((speciality) => this.showOtherSpeciality && speciality.description === this.formSpecialistRegister.controls['otherSpeciality'].value)) {
      throw new Error('La especialidad ingresada ya existe');
    }
    else
    {
      if(this.formSpecialistRegister.controls['otherSpeciality'].value != "" && !this.listOfSpecialities?.includes(this.formSpecialistRegister.controls['otherSpeciality'].value))
      {
        let speciality = new Especialidad({description: this.formSpecialistRegister.controls['otherSpeciality'].value, image: "https://firebasestorage.googleapis.com/v0/b/pruebaapp-c7145.appspot.com/o/default_spec.png?alt=media&token=2c12d342-adef-4ed0-b4e2-82ba064f6f77"});
        this.specialitiesService.addSpeciality(speciality);
      }
    }
  }


  private async setSpecialities() {
    this.listOfSpecialities = await this.specialitiesService.getAllSpecialities();
  }


  protected selectFile($event: Event, index: number) {
    const target = $event.target as HTMLInputElement;
    const file = target.files?.[0];
    this.profilesPhotos[index] = file;
  }


  private async uploadFiles() {
    for (const key in this.profilesPhotos) {
      const file = this.profilesPhotos[key] as File;
      const extension = file?.name.split('.').pop();
      const fileName = `${this.formSpecialistRegister.value.email}_${key}.${extension}`;
      this.formSpecialistRegister.value.profilePhoto = fileName;
      await this.userService.uploadPhoto(fileName, this.profilesPhotos[key]);
    }
  }


  private createUser() {
    let specialitys:string[] = [];
    this.selectedSpecialitys.forEach(spec => {
      specialitys.push(spec);
    });
    return new Especialista({...this.formSpecialistRegister.value, verifiedByAdmin: false, speciality: {description: specialitys, schedule: new Schedule()}});
  }
}