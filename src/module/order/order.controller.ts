import { Controller } from "@nestjs/common";
import { ControllerMetaData } from "@relationc/permissions";
import { OrderService } from "./order.service";

@ControllerMetaData('orders', 'Sale')
@Controller('orders')
export class OrderController {

  constructor(private orderService: OrderService) { }

}
