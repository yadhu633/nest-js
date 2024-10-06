import { Controller, Get, Post, Body, Patch, Param, Delete,Query,Put} from '@nestjs/common';
import { StockoutwardService } from './stockoutward.service';
import { CreateStockoutwardDto } from './dto/create-stockoutward.dto';
import { UpdateStockoutwardDto } from './dto/update-stockoutward.dto';
import { Stockoutward } from './stockoutward.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard  } from 'src/auth/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('stockoutward')
export class StockoutwardController {
  constructor(private readonly stockoutwardService: StockoutwardService) {}

  @Get('/groupbydate')
  async groupByDate() {
    const stockInwardsByDate = await this.stockoutwardService.groupByDate();
    return stockInwardsByDate;
  }

  @Post('/stockoutward')
  create(@Body() createStockoutwardDto: CreateStockoutwardDto) {
    return this.stockoutwardService.create(createStockoutwardDto);
  }
  @Get('/check')
  async checkStockoutwardByDate(@Query('date') date: Date) {
    const exists = await this.stockoutwardService.checkStockInwardByDate(date);
    return { exists };
  }
  @Get('/findstockout')
  findAll(): Promise<Stockoutward[]> {
    return this.stockoutwardService.findAll(); 
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Stockoutward> {
    return this.stockoutwardService.findById(id);
  }

  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: string, 
    @Body() updatestockinDto: CreateStockoutwardDto,
  ) {
    return this.stockoutwardService.update(id,updatestockinDto );
  } 

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.stockoutwardService.remove(id);
  }
}
