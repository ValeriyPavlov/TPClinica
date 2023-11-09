import { User } from "./User";

export class Paciente extends User {
    public socialWork: string;
    public profilePhotoTwo: string;
    constructor(params: {
      userId: string;
      name: string;
      lastName: string;
      age: number;
      email: string;
      dni: string;
      verified: boolean;
      password: string;
      socialWork: string;
      profilePhoto: string;
      profilePhotoTwo: string;
    }) {
      super(params, 'paciente');
      this.socialWork = params.socialWork;
      this.profilePhotoTwo = params.profilePhotoTwo;
    }
  }
  