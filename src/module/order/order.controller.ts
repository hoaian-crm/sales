import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ControllerMetaData } from "@relationc/permissions";
import { OrderService } from "./order.service";
import { CreateOrderBody } from "./dto/create.dto";

@ControllerMetaData('orders', 'Sale')
@Controller('orders')
export class OrderController {

  constructor(private orderService: OrderService) { }

  @Post('')
  async create(@Body() body: CreateOrderBody) {
    return this.orderService.create(body);
  }

  @Get('')
  async list() {

  }

  @Get(':orderId')
  async get() { }

  @Put(':orderId')
  async update() { }

  @Delete(':orderId')
  async delete() { }
}
