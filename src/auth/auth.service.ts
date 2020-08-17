import { Injectable } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  signPayload(payload: any) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  }
  async validateUser(payload : any) {
      return await this.userService.findByPayload(payload) ; 
  }
}
