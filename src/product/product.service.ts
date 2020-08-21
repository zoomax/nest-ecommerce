import { Injectable } from '@nestjs/common';
import { IProduct } from 'src/types/product';
import { Model, Types } from 'mongoose';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { UpdateProductDTO, CreateProductDTO } from 'src/dto/product.dto';
import { IUser } from 'src/types/user';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>,
  ) {}
  async findAll(filters: any): Promise<IProduct[]> {
    return await this.productModel.find(filters);
  }
  async findOne(id: string): Promise<IProduct> | null {
    return await this.productModel.findOne({ id });
  }
  async updateOne (id:string , data: UpdateProductDTO ,  user : IUser) : Promise<IProduct> { 
    return await this.productModel.findOneAndUpdate({id} , data , {new : true}) ;  
  }
  async deleteOne (id:string , user : IUser) : Promise<IProduct> { 
    return await this.productModel.findOneAndDelete({id}) ;  
  }
  async createOne (data : CreateProductDTO , user : IUser) : Promise<IProduct> | null { 
      return await new this.productModel({...data , owner : user.id}).save() ; 
  }
}
