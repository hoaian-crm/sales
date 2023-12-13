import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TotalRevenueByProduct } from './dto/statistic.dto';
import { Sale } from './entity/sale.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
  ) {}

  async totalRevenueByProduct(query: TotalRevenueByProduct) {
    // return this.saleRepository.query(
    //   `select sum(sales.amount) as "totalRevenue", date_part($1, sales."createdAt") as time, products.name  from sales
    //   inner join products on products.id = sales.product_id
    //   where "createdAt" >= $2 and "createdAt" <= $3
    //   group by date_part($1, sales."createdAt"), products.id
    //   `,
    //   values(query),
    // );

    return await this.saleRepository.query(
      `
      with top_products as (
        select sum(sale.amount * product.price) as total_sale, product.id, product.price, product.name from sales sale
        inner join products product on sale.product_id = product.id
        where extract(epoch from sale."createdAt") between $1 and $2
        group by (product.id)
        order by total_sale DESC
        limit 10000
      )
      select sum(sale.amount * top_product.price) as revenue, top_product.name, extract(${query.timeUnit} from sale."createdAt") as time, top_product.id from sales sale
      inner join top_products top_product on top_product.id = sale.product_id
      where extract(epoch from sale."createdAt") between $1 and $2
      group by extract(${query.timeUnit} from sale."createdAt"), top_product.id, top_product.name
      order by top_product.id
    `,
      [query.from, query.to],
    );
  }
}
