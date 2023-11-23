import { Turno } from "./Appointment";

export class Diagnostico{
    height: number;
    weight: number;
    temperature: number;
    pressure: number;
    dynamicData?: DynamicData[];

    constructor(diagnose: { height: number, weight: number, temperature: number, pressure: number, dynamicData: DynamicData }){
        this.height = diagnose.height;
        this.weight = diagnose.weight;
        this.temperature = diagnose.temperature;
        this.pressure = diagnose.pressure;
    }
}

export class DynamicData {
    key: any;
    value: any;
    constructor(additional: { key: any; value: any }) {
      this.key = additional.key;
      this.value = additional.value;
    }
}

export class HistorialClinico {
    id_patient: string;
    historial: Turno[]
    constructor(id: string){
        this.id_patient = id;
        this.historial = [];
    }
}