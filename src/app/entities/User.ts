export type UserRole = 'especialista' | 'paciente' | 'admin';

export class User {
  public userId: string;
  public verified: boolean;
  public userRole: UserRole;
  public name: string;
  public lastName: string;
  public dni: string;
  public age: number;
  public email: string;
  public password: string;
  public profilePhoto: string;

  constructor(
    params: {
      userId: string;
      name: string;
      lastName: string;
      dni: string;
      age: number;
      email: string;
      verified: boolean;
      password: string;
      profilePhoto: string;
    },
    userRole: UserRole
  ) {
    this.userId = params.userId;
    this.age = params.age;
    this.email = params.email;
    this.dni = params.dni;
    this.lastName = params.lastName;
    this.name = params.name;
    this.password = params.password;
    this.verified = params.verified;
    this.userRole = userRole;
    this.profilePhoto = params.profilePhoto;
  }
}
