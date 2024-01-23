import { Injectable } from "@nestjs/common";
import { CreateOrderBody } from "./dto/create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, ProductOrder } from "./order.entity";
import { Repository, TreeRepositoryNotSupportedError } from "typeorm";
import { FeeService } from "../fee/fee.service";
import { Messages } from "@relationc/logger";
import { GetOrderParams } from "./dto/get.dto";
import { ListOrderQuery } from "./dto/list.dto";
import { UpdateOrderBody, UpdateOrderParams } from "./dto/update.dto";
import { DeleteOrderParams } from "./dto/delete.dto";

@Injectable()
export class OrderService {


  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(ProductOrder) private productOrderRepository: Repository<ProductOrder>,
    private feeService: FeeService
  ) { }

  async create(body: CreateOrderBody) {

    const customer = await this.orderRepository.query(`select * from customers where id = $1`, [body.customerId]);
    if (customer.length === 0) throw Messages.notFound;

    const order = await this.orderRepository.save(this.orderRepository.create({
      customerId: body.customerId,
    }))

    const productMapper = {};
    body.products.forEach(product => {
      productMapper[product.id] = product.qty;
    });

    // Get product
    const products = await this.productOrderRepository.query(`
      select * from products where id in (${body.products.map(product => product.id).join(",")})
    `);

    // Verify all product in system
    if (products.length !== body.products.length) {
      throw Messages.notFound
    }

    // Create order product
    await this.productOrderRepository.save(
      products.map((product: ProductOrder) => this.productOrderRepository.create({ ...product, order: { id: order.id }, qty: productMapper[product.id], productId: product.id }))
    )

    // Create fee
    await this.feeService.createBulk(body.fees.map(fee => ({ ...fee, order })));
    return order;
  }

  async get(params: GetOrderParams) {
    const order = await this.orderRepository.findOne({ where: { id: params.id }, relations: ['products', 'fees'] })
    if (!order) throw Messages.notFound;
    order.products.map(product => order.subTotal += product.price * product.qty);
    order.total = order.subTotal;
    order.fees.map(fee => order.total -= fee.value)
    return order;
  }

  async list(query: ListOrderQuery) {
    return this.orderRepository.findAndCount({
      where: {
        customerId: query.customerId
      },
      skip: query.offset,
      take: query.limit,
      relations: ['products', 'fees']
    })
  }

  async delete(params: DeleteOrderParams) {
    return this.orderRepository.softDelete(params.id)
  }
}
