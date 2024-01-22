import { Injectable } from "@nestjs/common";
import { CreateOrderBody } from "./dto/create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, ProductOrder } from "./order.entity";
import { Repository, TreeRepositoryNotSupportedError } from "typeorm";
import { FeeService } from "../fee/fee.service";
import { Messages } from "@relationc/logger";

@Injectable()
export class OrderService {


  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(ProductOrder) private productOrderRepository: Repository<ProductOrder>,
    private feeService: FeeService
  ) { }

  async create(body: CreateOrderBody) {

    const order = await this.orderRepository.save(this.orderRepository.create({
      customerId: body.customerId,
    }))

    const products = await this.productOrderRepository.query(`
      select * from products where id in (${body.products.map(product => product.id).join(",")})
    `);

    const orderProduct = this.productOrderRepository.save(
      products.map(product => this.productOrderRepository.create({ ...product, orderId: order.id, id:  }))
    )

    const fees = this.productOrderRepository.save(
      body.fees.map(fee => this.feeService.create(fee))
    )

    return order;
  }
}
