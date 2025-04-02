import { RoleEnum } from './role.enum';

export interface Role {
  name: RoleEnum;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roles: Role[];
  password: string;
  isVerified: boolean;
}
