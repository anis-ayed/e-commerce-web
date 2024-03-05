import { UserRole } from '../enums/UserRole';

export interface LoginResponse {
  userId: string;
  role: UserRole;
}
