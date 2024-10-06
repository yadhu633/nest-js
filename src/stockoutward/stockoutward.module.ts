import { Module } from '@nestjs/common';
import { StockoutwardService } from './stockoutward.service';
import { StockoutwardController } from './stockoutward.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stockoutward,StockoutwardSchema } from './stockoutward.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stockoutward.name, schema: StockoutwardSchema  }, // Ensure correct names
     
    ]), // Ensure ProductModule is imported
  ],
  exports: [MongooseModule],  // Export so it can be used in other modules

  controllers: [StockoutwardController],
  providers: [StockoutwardService],
})
export class StockoutwardModule {}
