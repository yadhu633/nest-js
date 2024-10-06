import { Module,NestModule,MiddlewareConsumer,RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReguserModule } from './reguser/reguser.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { StockinwardModule } from './stockinward/stockinward.module';
import { StockoutwardModule } from './stockoutward/stockoutward.module';
import { StockModule } from './stockdetaildocument/stockdetaildocument.module';
import { LoginController } from './login/login.controller';
import { LoginValidationMiddleware } from './login-validation/login-validation.middleware';
import { Reguser, ReguserSchema } from './reguser/reguser.schema';
import { ReguserController } from './reguser/reguser.controller';
import { JwtStrategy } from './auth/jwt-strategy/jwt-strategy.service';
@Module({
  imports: [   
    MongooseModule.forFeature([{ name: Reguser.name, schema: ReguserSchema }]),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ReguserModule,
    JwtModule.register({
      secret:'your-secret-key',
      signOptions:{expiresIn:'1h'},
    }),
    ProductModule,
    StockinwardModule,
    StockoutwardModule,
    StockModule
  ],
  controllers: [AppController, LoginController,],
  providers: [AppService,JwtStrategy],
  exports:[JwtModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoginValidationMiddleware)
    .forRoutes('reguser/login'); 
    
  }
}
