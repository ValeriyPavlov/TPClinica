import { User } from "./User";

export class Log {
  public id?: string;
  public user: User;
  public date: string;
  public time: string;

  constructor(user: User) {
    this.user = user;
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    this.date = `${date.toLocaleDateString()}`;
    this.time = `${hours}:${minutes}:${seconds}`;
  }
}
