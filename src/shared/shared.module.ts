import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';

@Module({
  imports : [
      MongooseModule.forFeature([
          {name  : "Users" , schema  : UserSchema}
      ])
  ] ,   
  providers: [UserService],
  exports: [UserService],
})
export class SharedModule {}
