import { User } from 'src/auth/interfaces/user.interface';

export type UserResponseDto = Omit<User, 'password'>;
