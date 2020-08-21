import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from 'src/types/product';
import { CreateProductDTO, UpdateProductDTO } from 'src/dto/product.dto';
import { IUser } from 'src/types/user';
import { User } from 'src/utils/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from 'src/guards/seller.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(filter: any): Promise<IProduct[]> {
    return await this.productService.findAll(filter);
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IProduct> {
    return await this.productService.findOne(id);
  }
  @Post()
  @UseGuards(AuthGuard("jwt") , SellerGuard)
  async createProduct(
    @Body() data: CreateProductDTO,
    @User() user: IUser,
  ): Promise<IProduct> {
    return await this.productService.createOne(data, user);
  }
  @Patch(':id')
  @UseGuards(AuthGuard("jwt") , SellerGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDTO,
    @User() user: IUser,
  ): Promise<IProduct> {
    return await this.productService.updateOne(id, data, user);
  }
  @Delete(':id')
  @UseGuards(AuthGuard("jwt") , SellerGuard)
  async deleteProduct(
    @Param('id') id: string,
    @User() user: IUser,
  ): Promise<IProduct> {
    return await this.productService.deleteOne(id, user);
  }
}
