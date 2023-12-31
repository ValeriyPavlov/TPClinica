import { Schedule } from "./Schedule";
import { Especialidad } from "./Speciality";
import { User } from "./User";

export class Especialista extends User {
    public verifiedByAdmin: boolean;
    public speciality: {description: string[], schedule: Schedule};
    constructor(params: {
      userId: string;
      name: string;
      lastName: string;
      age: number;
      dni: string;
      email: string;
      password: string;
      speciality: {description: string[], schedule: Schedule};
      verified: boolean;
      verifiedByAdmin: boolean;
      profilePhoto: string;
    }) {
      super(params, 'especialista');
      this.verifiedByAdmin = params.verifiedByAdmin;
      this.speciality = params.speciality;
    }
  }
  