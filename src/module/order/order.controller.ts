import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiMetaData, ControllerMetaData } from "@relationc/permissions";
import { OrderService } from "./order.service";
import { CreateOrderBody } from "./dto/create.dto";
import { GetOrderParams } from "./dto/get.dto";
import { ListOrderQuery } from "./dto/list.dto";
import { ParamsTokenFactory } from "@nestjs/core/pipes";
import { DeleteOrderParams } from "./dto/delete.dto";
import { Response } from "@relationc/prototypes";

@ControllerMetaData('orders', 'Sale')
@Controller('orders')
export class OrderController {

  constructor(private orderService: OrderService) { }

  @ApiMetaData({
    name: 'Create order',
    description: 'Allow create order',
    policy: 'order:create'
  })
  @Post('')
  async create(@Body() body: CreateOrderBody) {
    const result = await this.orderService.create(body);
    return Response.createSuccess(result);
  }

  @ApiMetaData({
    name: 'Get multiple order',
    description: 'Allow get multiple order',
    policy: 'order:list'
  })
  @Get('')
  async list(@Query() query: ListOrderQuery) {
    const result = await this.orderService.list(query);
    return Response.findSuccess(result);
  }

  @ApiMetaData({
    name: 'Get order',
    description: 'Allow get order',
    policy: 'order:get'
  })
  @Get(':id')
  async get(@Param() params: GetOrderParams) {
    const result = await this.orderService.get(params);
    return Response.getSuccess(result);
  }

  @Put(':orderId')
  async update() {
    // Handle latter
  }

  @ApiMetaData({
    name: 'Delete order',
    description: 'Allow delete order',
    policy: 'order:delete'
  })
  @Delete(':id')
  async delete(@Param() params: DeleteOrderParams) {
    const result = this.orderService.delete(params);
    return Response.deleteSuccess(result);
  }
}
