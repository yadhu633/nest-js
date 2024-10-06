import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';  
import { Product } from './product.schema';  
import { Model } from 'mongoose';  
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

 async findOne(id: string): Promise<Product> {
  return this.productModel.findById(id).exec();
}

async update(id: string, updateProductDto: CreateProductDto): Promise<Product> {
  const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, {
    new: true, 
  });
  
  if (!updatedProduct) {
    throw new NotFoundException('Product not found'); 
  }
  
  return updatedProduct;
}


  async remove(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete({ _id:id }).exec();
  }
}
