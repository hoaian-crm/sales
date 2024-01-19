import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, ProductOrder } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, ProductOrder])
  ],
  providers: [
    OrderService
  ],
  exports: [
    OrderService
  ],
  controllers: [
    OrderController
  ]
})
export class OrderModule { }
