import {UserRole} from "../enums/UserRole";

export class User {
  private name!: string;
  private email!: string;
  private role!: UserRole;
  private password?: string;
  private confirmPassword?: string;


  constructor(name: string, email: string, role: UserRole, password: string, confirmPassword: string) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
