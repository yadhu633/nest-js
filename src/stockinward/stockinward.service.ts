import { Injectable, NotFoundException,InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stockinward } from './stockinward.schema';
import { CreateStockinwardDto } from './dto/create-stockinward.dto';
import { UpdateStockinwardDto } from './dto/update-stockinward.dto';
import mongoose from 'mongoose';
import { UpdateStockinDto } from './dto/updatestockin.dto';
@Injectable()
export class StockinwardService {
  constructor(
    @InjectModel(Stockinward.name) private stockInwardModel: Model<Stockinward>,
  ) {}

  async create(createStockinwardDto: CreateStockinwardDto) {
    const products = createStockinwardDto.products.map((product) => ({
      product_id: new mongoose.Types.ObjectId(product.productId), 
      quantity: product.quantity,
    }));
  
    const stockinward = new this.stockInwardModel({
      date: createStockinwardDto.date,
      products,
    });
  
    return await stockinward.save();
  }

  async findAll(): Promise<Stockinward[]> {
    return this.stockInwardModel.find().populate('products.product_id').exec(); 
  }
  async findById(id: string): Promise<Stockinward> {
    const stockInward = await this.stockInwardModel.findById(id).exec();
    if (!stockInward) {
      throw new NotFoundException(`StockInward with ID ${id} not found`);
    }
    return stockInward;
  }
   
   async removeAll(): Promise<any> {
    return this.stockInwardModel.deleteMany({}).exec(); 
  }
  async groupByDate(): Promise<any> {
    const result = await this.stockInwardModel.aggregate([
      {
        $project: {
          _id: 1, 
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          products: "$products"
        }
      },
      {
        $unwind: "$products"
      },
      {
        $group: {
          _id: {
            id: "$_id", 
            date: "$date"
          },
          totalQuantity: { $sum: "$products.quantity" }
        }
      },
      {
        $project: {
          _id: "$_id.id", 
          date: "$_id.date",
          totalQuantity: 1
        }
      },
      {
        $sort: { date: -1 }
      }
    ]).exec();
  
    const formattedResult = result.map(item => {
      return {
        _id: item._id,
        date: item.date,
        totalQuantity: item.totalQuantity
      };
    });
  
    return formattedResult;
  }

  
  async checkStockInwardByDate(date: Date): Promise<boolean> {
    const stockinward = await this.stockInwardModel.findOne({ date: new Date(date) }).exec();
    return !!stockinward; 
  }

  async updateStockInward(date: Date, updateStockinwardDto: UpdateStockinwardDto): Promise<Stockinward> {
    try {
      const stockInward = await this.stockInwardModel.findOne({ date }).exec();
  
      if (!stockInward) {
        throw new NotFoundException('Stock inward not found for the given date');
      }
  
      if (updateStockinwardDto.date) {
        stockInward.date = new Date(updateStockinwardDto.date);
      }
  
      if (updateStockinwardDto.products) {
        updateStockinwardDto.products.forEach((updatedProduct) => {
          const existingProduct = stockInward.products.find(
            (p) => p.product_id && p.product_id.toString() === updatedProduct.productId
          );
  
          if (existingProduct) {
            if (updatedProduct.quantity) {
              existingProduct.quantity = updatedProduct.quantity;
            }
          } else {
            stockInward.products.push({
              product_id: new mongoose.Types.ObjectId(updatedProduct.productId),
              quantity: updatedProduct.quantity || 0,
            });
          }
        });
      }
  
      return await stockInward.save();
    } catch (error) {
      console.error('Error updating stock inward:', error);
      throw new InternalServerErrorException('Failed to update stock inward');
    }
  }


  async update(id: string, updatestockindto: UpdateStockinDto) {
    const products = updatestockindto.products.map((product) => ({
      product_id: new mongoose.Types.ObjectId(product.productId), 
      quantity: product.quantity,
    }));
  
    const updatedStockin = await this.stockInwardModel.findByIdAndUpdate(
      id,
      {
        date: updatestockindto.date,
        products,
      },
      { new: true }
    ).exec();
  
    if (!updatedStockin) {
      throw new NotFoundException('Stockinward not found');
    }
  
    return updatedStockin;
  }
  
  
  async remove(id: string): Promise<Stockinward> {
    const deletedStockInward = await this.stockInwardModel.findByIdAndDelete(id);
    
    if (!deletedStockInward) {
      throw new NotFoundException(`StockInward with ID ${id} not found`);
    }

    return deletedStockInward; 
  }
}
