import { IUser } from 'src/types/user';

export interface UserDTO extends LoginDTO {
  username: IUser['username'];
  seller: IUser['seller'];
}
export interface LoginDTO {
  password: IUser['password'];
  email: IUser['email'];
}
