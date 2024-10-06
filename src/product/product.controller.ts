import { Controller, Get, Post, Body, Patch, Param, Delete,Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard  } from 'src/auth/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) 
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/addproduct')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)  
  @Get('/allproduct')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.productService.findOne(id);
  }

  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: string, 
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }
  

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
