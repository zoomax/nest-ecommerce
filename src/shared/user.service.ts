import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from 'src/types/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO, LoginDTO } from 'src/dto/user.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<IUser>) {}
  private sanitizeUser(user: IUser) {
    let sanitizedUser: any = user.toObject();
    delete sanitizedUser.password;
    return sanitizedUser;
  }
  async findByLogin(data: LoginDTO): Promise<IUser> | null {
    let email = data.email;
    let user = await this.userModel.findOne({ email });
    if (user) {
      let isPassword = await bcrypt.compare(data.password, user.password);
      if (isPassword) {
        return this.sanitizeUser(user);
      } else {
        throw new HttpException('invalid credintials', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('invalid credintials', HttpStatus.UNAUTHORIZED);
    }
  }
  async createUser(data: UserDTO) {
    let user = await this.userModel.findOne({ email: data.email });
    if (user) {
      throw new HttpException(
        'this user alraedy exixts',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      user = new this.userModel(data);
      await user.save();
      return this.sanitizeUser(user);
    }
  }
  async findByPayload(payload : any) : Promise<IUser> {
    let {username} = payload ; 
    return await this.userModel.findOne({username}) ; 
  }
}
