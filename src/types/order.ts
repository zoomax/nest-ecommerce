import {Document} from "mongoose" ; 
import { IUser } from "./user";
import { IProduct } from "./product";

interface ProductOrder { 
product : IProduct ;
qty : number 
}
export interface IOrder  extends  Document { 
    owner : IUser["_id"] ; 
    totalPrice : number ; 
    products : ProductOrder[]  ; 
    createdAt : Date ; 
    updatedAt  : Date ;  
    
}