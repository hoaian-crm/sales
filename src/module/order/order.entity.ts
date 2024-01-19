import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Fee } from '../fee/fee.entity';

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Fee)
  @JoinTable({ name: 'order_fee' })
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'fee_id',
  })
  fees: Array<Fee>;

  @OneToMany(() => ProductOrder, (product) => product.sale_id)
  products: Array<ProductOrder>;

  @Column()
  customer_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: string;
}

@Entity('product_order')
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  descripition: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  qty: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @Column()
  sale_id: number;
}
