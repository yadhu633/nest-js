import { Injectable,NotFoundException} from '@nestjs/common';
import { CreateStockoutwardDto } from './dto/create-stockoutward.dto';
import { UpdateStockoutwardDto } from './dto/update-stockoutward.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stockoutward } from './stockoutward.schema';
import mongoose from 'mongoose';

@Injectable()
export class StockoutwardService {
  constructor(
    @InjectModel(Stockoutward.name) private stockOutwardModel: Model<Stockoutward>,
  ) {}
  async create(createStockoutwardDto: CreateStockoutwardDto) {
    const products = createStockoutwardDto.products.map((product) => ({
      product_id: new mongoose.Types.ObjectId(product.productId), 
      quantity: product.quantity,
    }));
  
    const stockinward = new this.stockOutwardModel({
      date: createStockoutwardDto.date,
      products,
    });
  
    return await stockinward.save();
  }


  async checkStockInwardByDate(date: Date): Promise<boolean> {
    const stockoutward = await this.stockOutwardModel.findOne({ date: new Date(date) }).exec();
    return !!stockoutward; 
  }

  async update(id: string, updatestockoutdto: UpdateStockoutwardDto) {
    const products = updatestockoutdto.products.map((product) => ({
      product_id: new mongoose.Types.ObjectId(product.productId), 
      quantity: product.quantity,
    }));
  
    const updatedStockout = await this.stockOutwardModel.findByIdAndUpdate(
      id,
      {
        date: updatestockoutdto.date,
        products,
      },
      { new: true }
    ).exec();
  
    if (!updatedStockout) {
      throw new NotFoundException('Stockinward not found');
    }
  
    return updatedStockout;
  }
  

  

  async groupByDate(): Promise<any> {
    const result = await this.stockOutwardModel.aggregate([
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

  async findById(id: string): Promise<any> {
    const stockInward = await this.stockOutwardModel.findById(id).exec();
    if (!stockInward) {
      throw new NotFoundException(`StockInward with ID ${id} not found`);
    }
    return stockInward;
  }
  
  async findAll(): Promise<Stockoutward[]> {
    return this.stockOutwardModel.find().populate('products.product_id').exec(); 
  }
   
  findOne(id: number) {
    return `This action returns a #${id} stockoutward`;
  }

  

  async remove(id: string): Promise<Stockoutward> {
    const deletedStockoutward = await this.stockOutwardModel.findByIdAndDelete(id);
    
    if (!deletedStockoutward) {
      throw new NotFoundException(`StockInward with ID ${id} not found`);
    }

    return deletedStockoutward; 
  }
}
