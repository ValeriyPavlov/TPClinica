import { Paciente } from "./Patient";
import { Day } from "./Schedule";
import { Especialista } from "./Specialist";
import { Survey } from "./Survey";

export type AppointmentState = 'Pendiente' | 'Aceptado' | 'Realizado' | 'Rechazado' | 'Cancelado' | undefined;
export type AppointmentCalification = 1 | 2 | 3 | 4 | 5 | undefined;

export class Turno{
    public id?: string;
    public day: Day;
    public patient: Paciente;
    public specialist: Especialista;
    public state: AppointmentState;
    public review: string | undefined;
    public comment: string | undefined; 
    public survey: Survey | undefined;
    public calification: AppointmentCalification;
    public diagnose: string | undefined;
    constructor(appointment: {
        day: Day;
        patient: Paciente;
        specialist: Especialista;
        state?: AppointmentState;
        survey?: Survey;
        calification?: AppointmentCalification;
    }) {
        this.day = appointment.day;
        this.patient = appointment.patient;
        this.specialist = appointment.specialist;
        this.state = appointment.state;
        this.survey = appointment.survey;
        this.calification = appointment.calification;
    }
}
