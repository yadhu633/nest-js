import { Module } from '@nestjs/common';
import { StockinwardService } from './stockinward.service';
import { StockinwardController } from './stockinward.controller';
import { ProductModule } from '../product/product.module'; // Import the ProductModule
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../product/product.schema';
import { Stockinward, StockinwardSchema  } from './stockinward.schema'; // Corrected naming

@Module({
  imports: [
    ProductModule, 
    MongooseModule.forFeature([
      { name: Stockinward.name, schema: StockinwardSchema  }, // Ensure correct names
     
    ]), // Ensure ProductModule is imported

  ],
  exports: [MongooseModule],  // Export so it can be used in other modules

  controllers: [StockinwardController],
  providers: [StockinwardService],
})
export class StockinwardModule {}
