import { Controller, Post, Body, Get, Param,Delete,Query,NotFoundException,Put ,BadRequestException,InternalServerErrorException} from '@nestjs/common';
import { StockinwardService } from './stockinward.service';
import { CreateStockinwardDto } from './dto/create-stockinward.dto';
import { Stockinward } from './stockinward.schema';
import { UpdateStockinwardDto } from './dto/update-stockinward.dto';
import { UpdateStockinDto } from './dto/updatestockin.dto';
import { UseGuards } from '@nestjs/common';
  import { JwtAuthGuard  } from 'src/auth/jwt-auth/jwt-auth.guard';
 
@UseGuards(JwtAuthGuard)
@Controller('stockinward')
export class StockinwardController {
  constructor(private readonly stockinwardService: StockinwardService) {}

  @Post('/stockinward')
   createStockInward(@Body() createStockInwardDtos: CreateStockinwardDto) {
    return this.stockinwardService.create(createStockInwardDtos);
  }
  @Get('/findstockin')
  findAll(): Promise<Stockinward[]> {
    return this.stockinwardService.findAll(); 
  }
  @Delete('/removeAll')
  async removeAll() {
    return this.stockinwardService.removeAll();
  }
  @Get('/groupbydate')
  async groupByDate() {
    const stockInwardsByDate = await this.stockinwardService.groupByDate();
    return stockInwardsByDate;
  } 
  @Get('/check')
  async checkStockInwardByDate(@Query('date') date: Date) {
    const exists = await this.stockinwardService.checkStockInwardByDate(date);
    return { exists };
  }

  @Put('/update')
async updateStockInward(
    @Query('date') date: string, 
    @Body() updateStockinwardDto: UpdateStockinwardDto
) {
    try {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            throw new BadRequestException('Invalid date format');
        }
        return await this.stockinwardService.updateStockInward(dateObj, updateStockinwardDto);
    } catch (error) {
        console.error('Error updating stock inward:', error);
        throw new InternalServerErrorException('Failed to update stock inward');
    }
  }
  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: string, 
    @Body() updatestockinDto: CreateStockinwardDto,
  ) {
    return this.stockinwardService.update(id,updatestockinDto );
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Stockinward> {
    return this.stockinwardService.findById(id);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.stockinwardService.remove(id);
  }
}