import {Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Strategy , ExtractJwt , VerifiedCallback } from "passport-jwt";
import {PassportStrategy}from "@nestjs/passport"
import { AuthService } from "./auth.service";
import { Payload } from "src/types/payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
constructor (private readonly authService : AuthService)  {
    super( { 
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() , 
        secretOrKey : process.env.JWT_SECRET
    })
       
}
async validate(payload : Payload , done :VerifiedCallback) { 
 const user = await this.authService.validateUser(payload) ; 
 if (!user) { 
     return done(
         new HttpException("UNAUTHORIZED ACCESS" , HttpStatus.UNAUTHORIZED) , 
            false  
     )
 }else { 
     return done(null , user , payload.iat) ; 
 }
}
}