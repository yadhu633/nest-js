import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stockinward } from '../stockinward/stockinward.schema';
import { Stockoutward } from '../stockoutward/stockoutward.schema';
import { Product } from '../product/product.schema';
import { ProductService } from 'src/product/product.service';
import { ProductSchema } from '../product/product.schema';
import mongoose from 'mongoose';

@Injectable()
export class StockDetailService {
  constructor(
    @InjectModel(Stockinward.name) private stockinwardModel: Model<Stockinward>,
    @InjectModel(Stockoutward.name) private stockoutwardModel: Model<Stockoutward>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly productService: ProductService,
  ) {}

  async getStockSummaryForAllProducts(): Promise<any[]> {
    const products = await this.productService.findAll(); 
    const summaries = [];

    for (const product of products) {
      const productId = new mongoose.Types.ObjectId(product._id.toString());

      const totalStockInResult = await this.stockinwardModel.aggregate([
        { $unwind: "$products" },
        { $match: { "products.product_id": productId } },
        { $group: { _id: null, total: { $sum: "$products.quantity" } } }
      ]);

      const totalStockOutResult = await this.stockoutwardModel.aggregate([
        { $unwind: "$products" },
        { $match: { "products.product_id": productId } },
        { $group: { _id: null, total: { $sum: "$products.quantity" } } }
      ]);

      const totalStockIn = totalStockInResult.length > 0 ? totalStockInResult[0].total : 0;
      const totalStockOut = totalStockOutResult.length > 0 ? totalStockOutResult[0].total : 0;

    
      const currentStock = totalStockIn - totalStockOut;

      summaries.push({
        product_name: product.productname, 
        totalStockIn,
        totalStockOut,
        currentStock
      });
    }

    return summaries;
  }

  async getStockReport(startDate: string, endDate: string): Promise<any[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new NotFoundException('Invalid date format provided');
    }

    const stockInwards = await this.stockinwardModel.find({
      date: { $gte: start, $lte: end },
    }).populate('products.product_id', 'productname'); 

    const stockOutwards = await this.stockoutwardModel.find({
      date: { $gte: start, $lte: end },
    }).populate('products.product_id', 'productname');

    if (!stockInwards.length && !stockOutwards.length) {
      throw new NotFoundException('No stock data found for the provided date range');
    }

    return this.processStockData(stockInwards, stockOutwards);
  }

  processStockData(stockInwards: any[], stockOutwards: any[]): any[] {
    const stockMap = new Map();

    stockInwards.forEach(stockInward => {
      stockInward.products.forEach(product => {
        const productId = product.product_id._id.toString();
        if (!stockMap.has(productId)) {
          stockMap.set(productId, { productname: product.product_id.productname, totalStockIn: 0, totalStockOut: 0 });
        }
        stockMap.get(productId).totalStockIn += product.quantity;
      });
    });

    stockOutwards.forEach(stockOutward => {
      stockOutward.products.forEach(product => {
        const productId = product.product_id._id.toString();
        if (!stockMap.has(productId)) {
          stockMap.set(productId, { productname: product.product_id.productname, totalStockIn: 0, totalStockOut: 0 });
        }
        stockMap.get(productId).totalStockOut += product.quantity;
      });
    });

    const report = [];
    stockMap.forEach((value, key) => {
      report.push({
        product_name: value.productname,
        totalStockIn: value.totalStockIn,
        totalStockOut: value.totalStockOut,
        balanceStock: value.totalStockIn - value.totalStockOut,
      });
    });

    return report;
  }
}

