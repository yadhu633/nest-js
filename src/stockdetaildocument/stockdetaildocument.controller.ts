import { Controller, Get,Query,BadRequestException } from '@nestjs/common';
import { StockDetailService } from './stockdetaildocument.service';

@Controller('stockdetails')
export class StockDetailController {
  constructor(private readonly stockDetailService: StockDetailService) {}

  @Get('/summary')
  async getStockSummary(): Promise<any[]> {
    return this.stockDetailService.getStockSummaryForAllProducts();
  }


 // stock-detail.controller.ts
 @Get('report')
 async getStockReport(
   @Query('startDate') startDate: string,
   @Query('endDate') endDate: string,
 ) {
   if (!startDate || !endDate) {
     throw new BadRequestException('Start and end date are required');
   }

   return this.stockDetailService.getStockReport(startDate, endDate);
 }

}

