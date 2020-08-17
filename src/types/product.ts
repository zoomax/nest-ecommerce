import {Document} from "mongoose"  ; 
import { IUser } from "./user";
export interface IProduct  extends  Document { 
    title: string ; 
    owner : IUser["_id"]  ; 
    description : string  ; 
    image: string ; 
    price : number  ; 
    createdAt : Date ; 
    updatedAt : Date ;     
}