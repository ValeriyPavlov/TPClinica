export class Schedule { public days?: Day[]; }

export enum DaysOfWeek {

    Lunes = 'lunes',
    Martes = 'martes',
    Miercoles = 'miércoles',
    Jueves = 'jueves',
    Viernes = 'viernes',
    Sabado = 'sábado',
    Domingo = 'domingo',
}
  
export class Day {

    public dayOfWeek: DaysOfWeek;
    public date: string | undefined;
    public timeStart: string;
    public timeEnd: string;

    constructor(day?: {dayOfWeek: DaysOfWeek; date: string | undefined; timeStart: string; timeEnd: string;}) {
        this.dayOfWeek = day?.dayOfWeek!;
        this.date = day?.date;
        this.timeStart = day?.timeStart!;
        this.timeEnd = day?.timeEnd!;
    }
}