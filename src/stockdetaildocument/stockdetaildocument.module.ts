import { Module } from '@nestjs/common';
import { StockDetailService } from './stockdetaildocument.service';
import { StockDetailController } from './stockdetaildocument.controller';
import { StockinwardModule } from 'src/stockinward/stockinward.module';
import { StockoutwardModule } from 'src/stockoutward/stockoutward.module';
import { ProductModule } from 'src/product/product.module'; 

@Module({
  imports: [
    StockinwardModule,
    StockoutwardModule,
    ProductModule, 
  ],
  controllers: [StockDetailController],
  providers: [StockDetailService],
})
export class StockModule {}
