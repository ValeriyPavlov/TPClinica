import { Schedule } from "./Schedule";

export class Especialidad {
    public image?: string;
    public description: string;
    public schedule: Schedule;
    constructor(specialitie: { description: string; image?: string }) {
      this.description = specialitie.description;
      this.image = specialitie.image;
      this.schedule = new Schedule();
    }
}
  