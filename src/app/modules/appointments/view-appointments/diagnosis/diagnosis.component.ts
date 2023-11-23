import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Diagnostico, DynamicData } from 'src/app/entities/MedicalRecord';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent {

  @Output() public eventSendDiagnosis: EventEmitter<Diagnostico>;
  protected formDiagnosis: FormGroup;
  protected aditionalField: number[];

  constructor(private readonly formBuilder: FormBuilder, private readonly aService: AlertService) {
    this.aditionalField = [];
    this.eventSendDiagnosis = new EventEmitter();
    this.formDiagnosis = this.formBuilder.group({
      height: ['', [Validators.required, Validators.min(30), Validators.max(300)]],
      weight: ['', [Validators.required, Validators.min(1), Validators.max(300)]],
      temperature: ['', [Validators.required, Validators.min(30), Validators.max(45)]],
      pressure: ['', [Validators.required, Validators.min(80), Validators.max(160)]],
    });
  }

  protected async sendDiagnosis() {
    if (this.formDiagnosis.valid) {const diagnosis = new Diagnostico({...this.formDiagnosis.value});
      if (this.aditionalField.length > 0) {
        const additionalData: DynamicData[] = [];
        this.aditionalField.forEach((field) => {
          const data: DynamicData = new DynamicData({
            key: this.formDiagnosis.controls[`key_${field}`].value,
            value: this.formDiagnosis.controls[`value_${field}`].value,
          });
          additionalData.push(data);
        });
        diagnosis.dynamicData = additionalData;
      }
      this.formDiagnosis.reset();
      this.eventSendDiagnosis.emit(diagnosis);
    } else {
      await this.aService.showAlert({icon: 'error', message: 'Debe completar todos los campos', timer: 2000});
    }
  }

  protected addField($event: Event) {
    $event.preventDefault();
    if (this.aditionalField.length < 3) {
      const index = this.aditionalField.length + 1;
      this.aditionalField.push(index);
      this.formDiagnosis.addControl(`key_${index}`, new FormControl('', [Validators.required]));
      this.formDiagnosis.addControl(`value_${index}`, new FormControl('', [Validators.required]));
    }
  }

  protected removeField($event: Event) {
    $event.preventDefault();
    if (this.aditionalField.length > 0) {
      const valueToFind = this.aditionalField.length;
      const index = this.aditionalField.findIndex((value) => value === valueToFind);
      if (index > -1) {
        this.aditionalField.splice(index, 1);
        this.formDiagnosis.removeControl(`key_${valueToFind}`);
        this.formDiagnosis.removeControl(`value_${valueToFind}`);
      }
    }
  }

  protected return(){
    this.formDiagnosis.reset();
    this.eventSendDiagnosis.emit(undefined);
  }
}
